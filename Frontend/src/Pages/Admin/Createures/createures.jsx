import React from 'react'
import Adminsidbar from '../Sidbar/Adminsidbar'
import './createures.css'
import { Link } from 'react-router-dom'

function Createures() {
  return (
    <>
      <Adminsidbar/>
      <div className="main-container">
        <div className="row">
          <div className="col-xl-3 mb-30">
            <div className="card-box height-100-p widget-style1">
              <div className="d-flex flex-wrap align-items-center">
                <div className="widget-data">
                  <div className="weight-600 font-14 text-purple text-center">Créateurs</div>
                  <div className="h6 mb-0 text-center">42</div>
                </div>
                <img src="src/assets/images/etudiant.png" alt="" />
              </div>
            </div>
          </div>
        </div>
        <div className="DataTables_Table_2_filter" class="dataTables_filter">
          <label>Search:<input type="search" className="form-control form-control-sm" placeholder="Search" aria-controls="DataTables_Table_2"/></label>
        </div>
        <div className="card-box mb-30">
					<div className="pd-20">
						<h4 className="text-purple h4">Etudiants</h4>
					</div>
					<div className="pb-20">
						<table className="table hover multiple-select-row data-table-export nowrap">
							<thead>
								<tr>
									<th className="table-plus datatable-nosort text-purple">Nom</th>
									<th className="text-purple">Numéro</th>
									<th className="text-purple">classe</th>
									<th className="text-purple">Action</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td className="table-plus">ons</td>
									<td>12345678</td>
									<td>A</td>
									<td>
                    <button className="button1">             
                    <Link to="/profile" className="dropdown-toggle">
                    <span className="mtext">Profile</span>
                    </Link>
                    </button>
                    <button className="button2">             
                    <Link to="/editer" className="dropdown-toggle">
                    <span className="mtext">Editer</span>
                    </Link>
                    </button>
                    <button className="button3">             
                    <Link to="/supprimer" className="dropdown-toggle">
                    <span className="mtext">Supprimer</span>
                    </Link>
                    </button>
                   </td>
								</tr>
								<tr>
									<td className="table-plus">ithar</td>
									<td>87654321</td>
									<td>B</td>
                  <td>
                    <button className="button1">             
                    <Link to="/profile" className="dropdown-toggle">
                    <span className="mtext">Profile</span>
                    </Link>
                    </button>
                    <button className="button2">             
                    <Link to="/editer" className="dropdown-toggle">
                    <span className="mtext">Editer</span>
                    </Link>
                    </button>
                    <button className="button3">             
                    <Link to="/supprimer" className="dropdown-toggle">
                    <span className="mtext">Supprimer</span>
                    </Link>
                    </button>
                   </td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
      </div>
    </>
  )
}

export default Createures
