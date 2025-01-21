import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { API_URL, doApiGet, doApiMethod } from '../services/apiService';
import { addIfShowNav, addIsAdmin, addName } from '../featuers/myDetailsSlice';

const HomeClient = () => {
    const myName = useSelector(state => state.myDetailsSlice.name);
    const IsAdmin = useSelector(state => state.myDetailsSlice.isAdmin);
    const navigate = useNavigate();
    const [myInfo, setmyInfo] = useState({});
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(addIfShowNav({ ifShowNav: true }));
        console.log(myName);

        doApi()
    }, []);

    const doApi = async () => {
        let url = API_URL + "/users/myInfo";
        try {
            let data = await doApiGet(url);
            setmyInfo(data.data);
            dispatch(addName({ name: data.data.FirstName }));
            if (data.data.role == "admin") {
                dispatch(addIsAdmin({ isAdmin: true }));
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="container-fluid d-flex flex-column bg-light" style={{ minHeight: '100vh', padding: '20px' }}>
            {/* Original Section */}
            <div className="container text-center my-4 py-4 bg-white shadow rounded">
                <h1 className="mb-2 display-4 fw-bold">Welcome <span className='playCVGradient'>{myName || myInfo.FirstName}</span></h1>
                <button
                    className="btn btn-success fs-4 fw-bold mt-5 px-5 py-2"
                    onClick={() => navigate('/nameProject')}
                >
                    NEW
                </button>
            </div>

            {/* Informative Section */}
            <div className="container text-center my-4 py-4 bg-white shadow rounded">
                <h3 className="fw-bold">Your Dashboard</h3>
                <p className="text-muted fs-5">
                    Discover tools and resources to help you manage your projects efficiently. This space is designed to provide quick access to the most important features for your success.
                </p>
                <button
                    className="btn btn-outline-primary fw-bold mt-3 px-4 py-2"
                    onClick={() => navigate('/profile')}
                >
                    View Profile
                </button>
            </div>


        </div>
    );
};

export default HomeClient;
