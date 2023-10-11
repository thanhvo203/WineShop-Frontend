import React from "react";
import '../css/resigter.css';

function Resigter () {
    return (
        <>
        <div id="thanhVH">
        <div className="page-wrapper bg-gra-02 p-t-130 p-b-100 font-poppins">
          <div className="wrapper wrapper--w680">
            <div className="card card-4">
              <div className="card-body">
                <h2 className="title">Registration Form</h2>
                <form method="POST">
                  <div className="row row-space">
                    <div className="col-6">
                      <div className="input-group">
                        <label className="label">first name</label>
                        <input
                        style={{marginRight:'8px'}}
                          className="input--style-4"
                          type="text"
                          name="first_name"
                        />
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="input-group">
                        <label className="label">last name</label>
                        <input
                          className="input--style-4"
                          type="text"
                          name="last_name"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row row-space">
                    <div className="col-6">
                      <div className="input-group">
                        <label className="label">Email</label>
                        <input className="input--style-4" type="date" name="email" style={{marginRight:'8px'}}/>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="input-group">
                        <label className="label">Phone Number</label>
                        <input className="input--style-4" type="text" name="phone" />
                      </div>
                    </div>
                  </div>
          
                  <div className="row row-space">
                    <div className="col-6">
                      <div className="input-group">
                        <label className="label">Email</label>
                        <input className="input--style-4" type="email" name="email" style={{marginRight:'8px'}}/>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="input-group">
                        <label className="label">Phone Number</label>
                        <input className="input--style-4" type="text" name="phone" />
                      </div>
                    </div>
                  </div>
                  <div className="input-group">
                    <label className="label">Subject</label>
                    <div className="rs-select2 js-select-simple select--no-search">
                      <select name="subject">
                        <option disabled="disabled" selected="selected">
                          Choose option
                        </option>
                        <option>Subject 1</option>
                        <option>Subject 2</option>
                        <option>Subject 3</option>
                      </select>
                      <div className="select-dropdown" />
                    </div>
                  </div>
                  <div className="p-t-15">
                    <button className="btn btn--radius-2 btn--blue" type="submit">
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