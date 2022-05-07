/* eslint-disable */
import { Observable, Subscription } from 'rxjs';
import { ɵmarkDirty as markDirty } from '@angular/core';

interface ComponentDefinition {
  onInit(): void;
  onDestroy(): void;
}

const noop = () => {
};

function isUnitTestingInJest() {
  return (process as any).env.JEST_WORKER_ID !== undefined;
}

const getCmp = <T>(type: Function) => (type as any).ɵcmp as ComponentDefinition;
const subscriptionsSymbol = Symbol('__ng__subscriptions');

export function observed() {
  return function (
    target: object,
    propertyKey: string,
    descriptor?: PropertyDescriptor
  ) {
    if (descriptor) {
      const original = descriptor.value;
      descriptor.value = function (...args: any[]) {
        const result = original.apply(this, args);
        requestAnimationFrame(() => markDirty(this));
        return result;
      };
    } else {
      const cmp = isUnitTestingInJest() ? target as ComponentDefinition : getCmp(target.constructor);

      if (!cmp) {
        throw new Error(`Property ɵcmp is undefined. Are you using Ivy and AOT?`);
      }

      const onInit = cmp.onInit || noop;
      const onDestroy = cmp.onDestroy || noop;

      const getSubscriptions = (ctx) => {
        if (ctx[subscriptionsSymbol]) {
          return ctx[subscriptionsSymbol];
        }

        ctx[subscriptionsSymbol] = new Subscription();
        return ctx[subscriptionsSymbol];
      };

      const checkProperty = function (name: string) {
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        const ctx = this;

        if (ctx[name] instanceof Observable) {
          const subscriptions = getSubscriptions(ctx);
          subscriptions.add(ctx[name].subscribe(() => markDirty(ctx)));
        } else {
          const handler = {
            set(obj: unknown, prop: string, value: unknown) {
              obj[prop] = value;
              markDirty(ctx);
              return true;
            }
          };

          ctx[name] = new Proxy(ctx, handler);
        }
      };

      const checkComponentProperties = (ctx) => {
        const props = Object.getOwnPropertyNames(ctx);

        props.map((prop) => {
          return Reflect.get(target, prop);
        }).filter(Boolean).forEach(() => {
          checkProperty.call(ctx, propertyKey);
        });
      };

      cmp.onInit = function () {
        const ctx = this;

        onInit.call(ctx);
        checkComponentProperties(ctx);
      };

      cmp.onDestroy = function () {
        const ctx = this;

        onDestroy.call(ctx);

        if (ctx[subscriptionsSymbol]) {
          ctx[subscriptionsSymbol].unsubscribe();
        }
      };

      Reflect.set(target, propertyKey, true);
    }
  };
}
