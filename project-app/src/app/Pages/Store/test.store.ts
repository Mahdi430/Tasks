import { InjectionToken } from '@angular/core';
import { createStore, select, Store, withProps } from '@ngneat/elf';
import {
  localStorageStrategy,
  persistState,
  sessionStorageStrategy,
} from '@ngneat/elf-persist-state';
import { Task } from '../Components/TaskInterface/task.model';

export interface TestStoreModel {
  tasks: Task[];
}

const store = createStore(
  {
    name: 'test-store',
  },
  withProps<TestStoreModel>({
    tasks: [],
  })
);

export const test1$ = store.pipe(select(({ tasks }) => tasks));

export type Test1Store = typeof store;
export const TEST_STORE = new InjectionToken<ReturnType<typeof createStore>>(
  'Injection Token For Test 1 Store',
  {
    providedIn: 'root',
    factory: (): Test1Store => store,
  }
);
