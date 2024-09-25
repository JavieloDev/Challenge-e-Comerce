// product.actions.ts
import { createAction, props } from '@ngrx/store';

export const loadProducts = createAction('[Product] Load Products', props<{ products: any[] }>());
