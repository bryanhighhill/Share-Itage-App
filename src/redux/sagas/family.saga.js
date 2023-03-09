import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

// Family Saga: will be fired on "POST_FAMILY_NAME" actions (CreateFamilyPage.jsx)
function* createFamily(action) {
  try {
    // passes the family name and user.id from the payload to the server
    const newFamilyId = yield axios.post('/api/family', action.payload); //sends to family.router.js
    yield put({ type: 'FETCH_USER' }) //get request to update family data for user
  } catch (error) {
    console.log('Error with creating family:', error);
    yield put({ type: 'FAMILY_FAILED' });
  };
};

// Fetch Family Details from db - family table
function* fetchFamily(action) {
  const id = action.payload;
  try {
    const family = yield axios.get(`/api/family/${id}`);
    yield put({ type: 'SET_FAMILY', payload: family.data });
  } catch (error) {
    console.log('User get request failed', error);
  };
};

function* fetchFamilyMembers(action) {
  console.log('action.payload in fetch family members saga: ', action.payload);
  const id = action.payload;
  try {
    const familyMembers = yield axios.get(`/api/family/members/${id}`);
    yield put({ type: 'SET_FAMILY_MEMBERS', payload: familyMembers.data});
  } catch (error) {
    console.log('error with fetching family members: ', error);
  };
};

function* changeAdminStatus(action) {
  console.log('action payload in admin status saga: ', action.payload);
  try {
    yield axios.put(`api/family`, action.payload);
    yield put({ type: 'FETCH_FAMILY_MEMBERS'});
  } catch (error) {
    console.log('error with changing admin status', error);
  };
};

function* postUserInvite(action) {
  const token = action.payload;
  try {
    yield axios.post(`api/family/${token}`);
  } catch (error) {
    console.log('error with posting user invite', error);
  };
};

function* removeFamilyMember(action) {
  const family_id = action.payload.family_id;
  const id = action.payload.id;
  try {
    yield axios.put(`api/family/remove/${id}`, action.payload);
    yield put({ type: 'FETCH_FAMILY_MEMBERS', payload: family_id})
  } catch (error) {
    console.log('error with removing family member: ', error);
  };
};


function* familySaga() {
  yield takeEvery('POST_FAMILY_NAME', createFamily); //dispatched from CreateFamilyPage
  yield takeEvery('FETCH_FAMILY', fetchFamily); //dispatched from family confirmation page
  yield takeEvery('FETCH_FAMILY_MEMBERS', fetchFamilyMembers); //dispatched from admin page
  yield takeEvery('CHANGE_ADMIN_STATUS', changeAdminStatus); //dispatched from admin page
  yield takeEvery('POST_USER_INVITE', postUserInvite); //dispatched from admin page
  yield takeEvery('REMOVE_FAMILY_MEMBER', removeFamilyMember); //dispatched from admin page
  // yield takeEvery('REMOVE_MEMBER', removeMember); //dispatched from admin page / DeleteMemberButton
}
export { familySaga };