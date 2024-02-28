import React from 'react'
import Adminsidbar from '../Sidbar/Adminsidbar'

function Calendrier() {
  return (
    <>
      <Adminsidbar />
      <div className="main-container">
        <div className="pd-ltr-20 xs-pd-20-10">
              <div id="modal-view-event" className="modal modal-top fade calendar-modal">
                <div className="modal-dialog modal-dialog-centered">
                  <div className="modal-content">
                    <div className="modal-body">
                      <h4 className="h4"><span className="event-icon weight-400 mr-3"></span><span className="event-title"></span></h4>
                      <div className="event-body"></div>
                    </div>
                    <div className="modal-footer">
                      <button type="button" className="btn btn-primary" data-dismiss="modal">Close</button>
                    </div>
                  </div>
                </div>
              </div>

              <div id="modal-view-event-add" className="modal modal-top fade calendar-modal">
                <div className="modal-dialog modal-dialog-centered">
                  <div className="modal-content">
                    <form id="add-event">
                      <div className="modal-body">
                        <h4 className="text-blue h4 mb-10">Add Event Detail</h4>
                        <div className="form-group">
                          <label>Event name</label>
                          <input type="text" className="form-control" name="ename" />
                        </div>
                        <div className="form-group">
                          <label>Event Date</label>
                          <input type='text' className="datetimepicker form-control" name="edate" />
                        </div>
                        <div className="form-group">
                          <label>Event Description</label>
                          <textarea className="form-control" name="edesc"></textarea>
                        </div>
                        <div className="form-group">
                          <label>Event Color</label>
                          <select className="form-control" name="ecolor">
                            <option value="fc-bg-default">fc-bg-default</option>
                            <option value="fc-bg-blue">fc-bg-blue</option>
                            <option value="fc-bg-lightgreen">fc-bg-lightgreen</option>
                            <option value="fc-bg-pinkred">fc-bg-pinkred</option>
                            <option value="fc-bg-deepskyblue">fc-bg-deepskyblue</option>
                          </select>
                        </div>
                        <div className="form-group">
                          <label>Event Icon</label>
                          <select className="form-control" name="eicon">
                            <option value="circle">circle</option>
                            <option value="cog">cog</option>
                            <option value="group">group</option>
                            <option value="suitcase">suitcase</option>
                            <option value="calendar">calendar</option>
                          </select>
                        </div>
                      </div>
                      <div className="modal-footer">
                        <button type="submit" className="btn btn-primary">Save</button>
                        <button type="button" className="btn btn-primary" data-dismiss="modal">Close</button>
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

export default Calendrier
