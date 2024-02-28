import React from 'react'
import Adminsidbar from '../Sidbar/Adminsidbar'
import './createures.css'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
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
          <label style={{ marginRight: '10px' }}>Rechercher:<input type="search" className="form-control form-control-sm" placeholder="Rechercher" aria-controls="DataTables_Table_2"/></label>
          <button className="button1" style={{ marginLeft: '10px' }}>             
            <Link to="/nouveauCrea" className="dropdown-toggle">
            <span className="mtext">Nouveau</span>
            </Link>
          </button>
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
                  <th className="text-purple">Prénom</th>
                  <th className="text-purple">Email</th>
									<th className="text-purple">Numéro</th>
									<th className="text-purple">Domaine</th>
                  <th className="text-purple">Action</th>
								</tr>
							</thead>
							<tbody>
								<tr>
                <td className="table-plus">ESSID</td>
									<td>Ithar</td>
									<td>ithar333@gmail.com</td>
                  <td>26774811</td>
                  <td>A</td>
									<td>
                  <button className="button1">             
                  <Link to="/profile" className="dropdown-toggle">
                    <FontAwesomeIcon icon={faEye} /> 
                  </Link>
                  </button>
                  <button className="button2">             
                  <Link to="/supprimer" className="dropdown-toggle">
                    <FontAwesomeIcon icon={faTrashAlt} />
                  </Link>
                  </button>
                   </td>
								</tr>
								<tr>
                <td className="table-plus">ELFEKIH</td>
									<td>Ons</td>
									<td>elfekihons@gmail.com</td>
                  <td>55963211</td>
                  <td>A</td>
                  <td>
                  <button className="button1">             
                  <Link to="/profile" className="dropdown-toggle">
                    <FontAwesomeIcon icon={faEye} /> 
                  </Link>
                  </button>
                  <button className="button2">             
                  <Link to="/supprimer" className="dropdown-toggle">
                    <FontAwesomeIcon icon={faTrashAlt} />
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
