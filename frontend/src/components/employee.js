import axios from "axios";
import _ from "lodash";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const Employee = () => {
  const defaultFormValue = {
    firstName: "",
    lastName: "",
    department: "",
  };
  const [employeeList, setEmployeeList] = useState([]);
  const [departmentList, setDepartmentList] = useState([]);
  const [employeeDetail, setEmployeeDetail] = useState(defaultFormValue);
  const [formType, setFormType] = useState("Add");

  const getDepartmentList = async () => {
    try {
      const { data } = await axios.get("http://localhost:8080/department");
      if (data && data?.success) {
        setDepartmentList(data?.departments);
      } else {
        toast.error(data.message);
        setDepartmentList([]);
      }
    } catch (error) {
      toast.error("Something worng to get employee list.");
      setDepartmentList([]);
    }
  };

  useEffect(() => {
    getDepartmentList();
  }, []);

  const getEmployeeList = async () => {
    setEmployeeList([]);
    try {
      const { data } = await axios.get("http://localhost:8080/employee");
      if (data && data?.success) {
        setEmployeeList(data?.employees);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Something worng to get employee list.");
    }
  };

  useEffect(() => {
    getEmployeeList();
  }, []);

  const openEditViewEMployee = async (v) => {
    setEmployeeDetail(v);
    setFormType("Update");
  };

  const onChangeFormAction = (flType, val) => {
    setEmployeeDetail({
      ...employeeDetail,
      [flType]: val,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(employeeDetail);
    let method = "post";
    let url = "http://localhost:8080/employee";
    if (formType === "Update") {
      method = "put";
      url = url + `/${employeeDetail?._id}`;
    }
    const newData = {
      firstName: employeeDetail?.firstName,
      lastName: employeeDetail?.lastName,
      department: employeeDetail?.department,
    };
    try {
      const { data } = await axios[method](url, newData);
      if (data && data?.success) {
        toast.success(data.message);
        getEmployeeList();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Something worng to get employee list.");
    }
  };

  const onDeleteEmployee = async () => {
    try {
      if (!_.isEmpty(employeeDetail) && employeeDetail?._id) {
        const { data } = await axios.delete(`http://localhost:8080/employee/${employeeDetail._id}`);
        if (data && data?.success) {
          toast.success(data.message);
          setEmployeeDetail(defaultFormValue);
          getEmployeeList()
        } else {
          toast.error(data.message);
        }
      } else {
        toast.error('Employee Not found.');
      }
    } catch (error) {
      toast.error("Something worng to get employee list.");
    }
  };

  return (
    <div className="container">
      <Toaster />
      <h2 className="mb-3 w-100">
        <span className="float-start">Employee</span>
        <span className="float-end">
          <button
            className="btn btn-primary me-3"
            data-bs-toggle="modal"
            data-bs-target="#viewEditModal"
            onClick={() => {
              setEmployeeDetail(defaultFormValue);
              setFormType("Add");
            }}
          >
            + Add
          </button>
        </span>
      </h2>

      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">First</th>
            <th scope="col">Last</th>
            <th scope="col">Department</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {!_.isEmpty(employeeList) ? (
            _.map(employeeList, (v, i) => (
              <tr>
                <th scope="row">{i + 1}</th>
                <td>{v.firstName}</td>
                <td>{v.lastName}</td>
                <td>{v.department?.name}</td>
                <td>
                  <button
                    type="button"
                    className="btn btn-primary me-2"
                    data-bs-toggle="modal"
                    data-bs-target="#viewEditModal"
                    onClick={() => openEditViewEMployee(v)}
                  >
                    View/Edit
                  </button>

                  <button
                    type="button"
                    className="btn btn-danger"
                    data-bs-toggle="modal"
                    data-bs-target="#deleteConfurm"
                    onClick={() => setEmployeeDetail(v)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No data Found.</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* add/update employee detail modal */}
      <div
        className="modal fade"
        id="viewEditModal"
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                {formType === 'Add' ? 'Add New Employee' : 'Edit "' + employeeDetail?.firstName + " " + employeeDetail?.lastName + '"'}
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() => {
                  setEmployeeDetail(defaultFormValue);
                }}
              />
            </div>
            <div className="modal-body text-start">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">First Name</label>
                  <input
                    type="text"
                    className="form-control"
                    value={employeeDetail?.firstName}
                    onChange={(e) =>
                      onChangeFormAction("firstName", e.target.value)
                    }
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Last Name</label>
                  <input
                    type="text"
                    className="form-control"
                    value={employeeDetail?.lastName}
                    onChange={(e) =>
                      onChangeFormAction("lastName", e.target.value)
                    }
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Department</label>
                  <select
                    className="form-select"
                    aria-label="Default select example"
                    value={employeeDetail?.department?._id}
                    onChange={(e) =>
                      onChangeFormAction("department", e.target.value)
                    }
                  >
                    <option>Open this select menu</option>
                    {!_.isEmpty(departmentList) &&
                      _.map(departmentList, (v, i) => (
                        <option key={i} value={v?._id}>
                          {v?.name}
                        </option>
                      ))}
                  </select>
                </div>
                <div className="text-end">
                  <button type="submit" className="btn btn-primary me-3">
                    Submit
                  </button>
                  <button
                    type="reset"
                    className="btn btn-danger"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                    onClick={() => {
                      setEmployeeDetail(defaultFormValue);
                    }}
                  >
                    Cancel & Close
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* For Delete employee to confurme modal */}
      <div
        className="modal fade"
        id="deleteConfurm"
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Delete Employee {employeeDetail?.firstName + " " + employeeDetail?.lastName}
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body text-start">
              <p>Are you sure to delete this employee from list?</p>
            </div>
            <div className="text-end m-3">
              <button
                type="button"
                className="btn btn-danger me-1"
                data-bs-dismiss="modal"
                onClick={onDeleteEmployee}
              >
                Yes
              </button>
              <button type="button" className="btn btn-primary"
                data-bs-dismiss="modal">
                No
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Employee;
