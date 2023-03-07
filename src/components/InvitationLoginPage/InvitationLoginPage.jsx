import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import InviteRegisterForm from './InviteRegisterForm.jsx';

const InvitationLoginPage = () => {
    const tokens = useSelector((store) => store.tokens);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({ type: 'FETCH_TOKENS' });
    }, []);



    return (
        <div>
          <InviteRegisterForm />
    
          {/* <center>
            <button
              type="button"
              className="btn btn_asLink"
              onClick={() => {
                history.push('/login');
              }}
            >
              Login
            </button>
          </center> */}
        </div>
    );
};

export default InvitationLoginPage;