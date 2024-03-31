// import { InjectionToken } from '@angular/core';
// import { createStore, select, Store, withProps } from '@ngneat/elf';
// import {
//   persistState,
//   sessionStorageStrategy,
// } from '@ngneat/elf-persist-state';

// export interface TestStoreModel {
//   test1: string;
// }

// const store = createStore(
//   {
//     name: 'test-store',
//   },
//   withProps<TestStoreModel>({
//     test1: '',
//   })
// );

// persistState(store, { storage: sessionStorageStrategy });

// export const test1$ = store.pipe(select(({ test1 }) => test1));

// export type Test1Store = typeof store;
// export const TEST_STORE = new InjectionToken<ReturnType<typeof createStore>>(
//   'Injection Token For Test 1 Store',
//   {
//     providedIn: 'root',
//     factory: (): Test1Store => store,
//   }
// );
