import React from "react";
import '../css/resigter.css';

function Resigter() {
  return (
    <>
      <div id="thanhVH" >
        <div className="page-wrapper bg-gra-02 p-t-130 p-b-100 font-poppins" style={{ backgroundImage: 'url(https://wineudesign.com/wp-content/uploads/2022/04/anna-hecker-cJdwPzls6kg-unsplash.jpg)', height: '770px' }}>
          <div className="wrapper wrapper--w680">
            <div className="card card-4">
              <div className="card-body">
                <h2 className="title">Registration</h2>
                <form method="POST">
                  <div className="row row-space">
                    <div className="col-6">
                      <div className="input-group">
                        <label className="label">Full Name</label>
                        <input
                          style={{ marginRight: '8px' }}
                          className="input--style-4"
                          type="text"
                         
                        />
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="input-group">
                        <label className="label">Gender</label>
                        <input
                          className="input--style-4"
                          type="text"
                          
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row row-space">
                    <div className="col-6">
                      <div className="input-group">
                        <label className="label">Date Of Birth</label>
                        <input className="input--style-4" type="date" name="email" style={{ marginRight: '8px' }} />
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="input-group">
                        <label className="label">Phone Number</label>
                        <input className="input--style-4" type="number" name="phone" />
                      </div>
                    </div>
                  </div>

                  <div className="row row-space">
                    <div className="col-6">
                      <div className="input-group">
                        <label className="label">Email</label>
                        <input className="input--style-4" type="email" name="email" style={{ marginRight: '8px' }} />
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="input-group">
                        <label className="label">Address</label>
                        <input className="input--style-4" type="text" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-t-15">
                    <button className="btn btn--radius-2 btn--blue" style={{backgroundColor:'#b7472a'}} type="submit">
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>

  )
}
export default Resigter;