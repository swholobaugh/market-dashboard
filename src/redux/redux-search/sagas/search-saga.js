import { searchSymbol } from '../../../api/index';
import { put, call, takeLatest, select } from 'redux-saga/effects';
import { getSearchValue } from '../selectors/get-symbol-list';

import { 
  fetchSymbolsStarted,
  fetchSymbolsFailed,
  fetchSymbolsSucceeded
} from '../reducer';

function* searchSymbols() {

  const state = yield select();

  try {
    const response = yield call(searchSymbol, state.search.searchValue);
    console.log(response);

    yield put (fetchSymbolsSucceeded({
      symbols: response.tickers
    }));

  } catch (e) {

    yield put (fetchSymbolsFailed({
      error: e.message,
    }));
  }

}

export default function* searchSaga() {
  yield takeLatest(fetchSymbolsStarted, searchSymbols);
}