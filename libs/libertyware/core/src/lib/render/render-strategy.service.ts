import { Injectable } from '@angular/core';
import { RxState } from '@rx-angular/state';
import { getStrategies } from '@rx-angular/template';
import { RenderStrategy } from './render-strategy.enum';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private readonly state = new RxState<{
    renderStrategy: RenderStrategy;
  }>();

  readonly renderStrategy$ = this.state.select('renderStrategy');

  strategies = Object.keys(getStrategies({ cdRef: { context: {} } } as never));


  setStrategy(renderStrategy: RenderStrategy) {
    this.state.set({ renderStrategy });
  }

  setStrategyByName(renderStrategyName: string) {
    this.state.set({ renderStrategy: this.strategies[renderStrategyName] });
  }
}
