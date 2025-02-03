import React, { useEffect, useState } from "react";
import * as FaIcons from "react-icons/fa";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import ReactPaginate from "react-paginate";
import { Fa0, FaCarBattery } from "react-icons/fa6";
import { apiService } from "../services/apiservice";
import toast from "react-hot-toast";

const facilityValidationSchema = Yup.object().shape({
  name: Yup.string().required("Facility is required"),
  icon: Yup.string().required("Icon selection is required"),
});

const serviceValidationSchema = Yup.object().shape({
  service: Yup.string().required("Service is required"),
  price: Yup.number()
    .typeError("Price must be a number")
    .positive("Price must be positive")
    .required("Price is required"),
});

const maintenanceValidationSchema = Yup.object().shape({
  maintenanceType: Yup.string().required("Maintenance type is required"),
});

const allIcons = Object.keys(FaIcons).map((iconName) => ({
  id: iconName,
  icon: React.createElement(FaIcons[iconName]),
}));

function AdditionalService() {
  const [selectedIcon, setSelectedIcon] = useState(null);
  const [iconSearch, setIconSearch] = useState("");

  // State for holding data with initial mock data
  const [facilities, setFacilities] = useState([]);

  useEffect(() => {
    fetchFacilityList();
  }, []);

  const fetchFacilityList = async () => {
    try {
      const response = await apiService.getData("facility/list");
      console.log(response.data)
      setFacilities(response.data)


    } catch (error) {
      console.error("Error fetching guest list:", error);

    }
  };

  const [services, setServices] = useState([
    { service: "Cleaning", price: 50 },
    { service: "Laundry", price: 30 },
    { service: "Room Service", price: 20 },
    { service: "Catering", price: 100 },
    { service: "Cleaning", price: 50 },

    
  ]);

  const [maintenanceTypes, setMaintenanceTypes] = useState([
    { maintenanceType: "Electrical" },
    { maintenanceType: "Plumbing" },
    { maintenanceType: "HVAC" },
    { maintenanceType: "Carpentry" },
  ]);

  // Pagination State
  const [currentPageFacility, setCurrentPageFacility] = useState(0);
  const [currentPageService, setCurrentPageService] = useState(0);
  const [currentPageMaintenance, setCurrentPageMaintenance] = useState(0);

  // Helper for pagination
  const handlePageClickFacility = (data) => setCurrentPageFacility(data.selected);
  const handlePageClickService = (data) => setCurrentPageService(data.selected);
  const handlePageClickMaintenance = (data) => setCurrentPageMaintenance(data.selected);

  // Table data per page
  const itemsPerPage = 3;
  const facilityData = facilities.slice(currentPageFacility * itemsPerPage, (currentPageFacility + 1) * itemsPerPage);
  const serviceData = services.slice(currentPageService * itemsPerPage, (currentPageService + 1) * itemsPerPage);
  const maintenanceData = maintenanceTypes.slice(currentPageMaintenance * itemsPerPage, (currentPageMaintenance + 1) * itemsPerPage);

  const pageCount = Math.ceil(facilities.length / itemsPerPage);



  return (
    <div className="p-6 max-w-5xl mx-auto rounded-lg space-y-6">
      {/* Facilities Section */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="p-6 bg-white rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Add New Facility</h2>
          <Formik
            initialValues={{ name: "", icon: "" }}
            validationSchema={facilityValidationSchema}
            onSubmit={async (values, { resetForm }) => {
              try {
                const response = await apiService.postData("facility/create", values)
                toast.success(response.msg)
                console.log(response)
                setFacilities([...facilities, values]);
                resetForm();
              } catch (error) {
                toast.error(error)
              }


            }}
          >
            {({ setFieldValue }) => (
              <Form className="space-y-4">
                <Field
                  type="text"
                  name="name"
                  placeholder="Add new facility"
                  className="w-full p-2 border rounded"
                />
                <ErrorMessage name="name" component="div" className="text-red-500 text-sm" />
                <input
                  type="text"
                  placeholder="Search icon..."
                  className="w-full p-2 border rounded"
                  value={iconSearch}
                  onChange={(e) => setIconSearch(e.target.value)}
                />
                <Field
                  as="select"
                  name="icon"
                  className="w-full p-2 border rounded"
                  onChange={(e) => {
                    const selected = e.target.value;
                    setSelectedIcon(selected);
                    setFieldValue("icon", selected);
                  }}
                >
                  <option value="">Select an Icon</option>
                  {allIcons
                    .filter((icon) => icon.id.toLowerCase().includes(iconSearch.toLowerCase()))
                    .map((icon) => (
                      <option key={icon.id} value={icon.id}>
                        <i className={`icon-${icon.id}`} style={{ marginRight: 10 }}></i>
                        {icon.id}
                      </option>
                    ))}
                </Field>
                <ErrorMessage name="icon" component="div" className="text-red-500 text-sm" />
                {selectedIcon && (
                  <div className="mt-4 flex items-center space-x-2">
                    <span className="text-lg">
                      {allIcons.find((icon) => icon.id === selectedIcon)?.icon}
                    </span>
                    <span>{selectedIcon}</span>
                  </div>
                )}
                <button type="submit" className="w-full bg-primary text-white py-2 rounded">
                  Add Facility
                </button>
              </Form>
            )}
          </Formik>

          {/* Facility Table */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold">Facilities</h3>
            <table className="w-full mt-4 table-auto">
              <thead className="bg-gray-900 text-white border-2 border-black">
                <tr>
                  <th className="border px-4 py-2">Facility</th>
                  <th className="border px-4 py-2">Icon</th>
                </tr>
              </thead>
              <tbody>
                {facilityData.map((facility, index) => (
                  <tr key={index}>
                    <td className="border px-4 py-2">{facility.name}</td>
                    <td className="border px-4 py-2">
                      {allIcons.find((icon) => icon.id === facility.icon)?.icon}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex flex-wrap justify-center mt-8">
              <ReactPaginate
                previousLabel={<span className="px-3 py-2 bg-gray-200 rounded-l">←</span>}
                nextLabel={<span className="px-3 py-2 bg-gray-200 rounded-r">→</span>}
                pageCount={pageCount}
                onPageChange={handlePageClickFacility}
                containerClassName={"flex space-x-2"}
                pageLinkClassName={"px-4 py-2 bg-gray-100 border rounded-md hover:bg-primary hover:text-white cursor-pointer"}
                activeLinkClassName={"bg-primary text-white"}
                disabledLinkClassName={"text-gray-400 cursor-not-allowed"}
                pageRangeDisplayed={1}  // Show 4 pages at a time
                marginPagesDisplayed={1}  // Show 1 page at the start/end of the page range
              />
            </div>
          </div>
        </div>

        {/* Additional Services */}
        <div className="p-6 bg-white rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Add New Additional Service</h2>
          <Formik
            initialValues={{ service: "", price: "" }}
            validationSchema={serviceValidationSchema}
            onSubmit={(values, { resetForm }) => {
              setServices([...services, values]);
              resetForm();
            }}
          >
            <Form className="space-y-4">
              <Field type="text" name="service" placeholder="Service Name" className="w-full p-2 border rounded" />
              <ErrorMessage name="service" component="div" className="text-red-500 text-sm" />
              <Field type="text" name="price" placeholder="Price (USD)" className="w-full p-2 border rounded" />
              <ErrorMessage name="price" component="div" className="text-red-500 text-sm" />
              <button type="submit" className="w-full bg-primary text-white py-2 rounded">
                Add Service
              </button>
            </Form>
          </Formik>

          {/* Service Table */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold">Additional Services</h3>
            <table className="w-full mt-4 table-auto">
              <thead className="bg-gray-900 text-white border-2 border-black">
                <tr>
                  <th className="border px-4 py-2">Service</th>
                  <th className="border px-4 py-2">Price</th>
                </tr>
              </thead>
              <tbody>
                {serviceData.map((service, index) => (
                  <tr key={index}>
                    <td className="border px-4 py-2">{service.service}</td>
                    <td className="border px-4 py-2">{service.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex justify-center mt-8">
              <ReactPaginate
                previousLabel={<span className="px-3 py-2 bg-gray-200 rounded-l">←</span>}
                nextLabel={<span className="px-3 py-2 bg-gray-200 rounded-r">→</span>}
                pageCount={Math.ceil(services.length / itemsPerPage)}
                onPageChange={handlePageClickService}
                containerClassName={"flex space-x-2"}
                pageLinkClassName={"px-4 py-2 bg-gray-100 border rounded-md hover:bg-primary hover:text-white cursor-pointer"}
                activeLinkClassName={"bg-primary text-white"}
                disabledLinkClassName={"text-gray-400 cursor-not-allowed"}
                pageRangeDisplayed={1}  // Show 4 pages at a time
                marginPagesDisplayed={1}  // Show 1 page at the start/end of the page range
              />
            </div>
          </div>
        </div>
      </div>

      {/* Maintenance Section */}
      <div className="p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Add New Maintenance Type</h2>
        <Formik
          initialValues={{ maintenanceType: "" }}
          validationSchema={maintenanceValidationSchema}
          onSubmit={(values, { resetForm }) => {
            setMaintenanceTypes([...maintenanceTypes, values]);
            resetForm();
          }}
        >
          <Form className="space-y-4">
            <Field
              type="text"
              name="maintenanceType"
              placeholder="Maintenance Type"
              className="w-full p-2 border rounded"
            />
            <ErrorMessage name="maintenanceType" component="div" className="text-red-500 text-sm" />
            <button type="submit" className="w-100 px-2 text-center bg-primary text-white py-2 rounded">
              Add Maintenance Type
            </button>
          </Form>
        </Formik>

        {/* Maintenance Table */}
        <div className="mt-6">
          <table className="w-full mt-4 table-auto">
            <thead className="bg-gray-900 text-white border-2 border-black">
              <tr>
                <th className="border px-4 py-2">Maintenance Type</th>
              </tr>
            </thead>
            <tbody>
              {maintenanceData.map((maintenance, index) => (
                <tr key={index}>
                  <td className="border px-4 py-2">{maintenance.maintenanceType}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-center mt-8">
            <ReactPaginate
              previousLabel={<span className="px-3 py-2 bg-gray-200 rounded-l">←</span>}
              nextLabel={<span className="px-3 py-2 bg-gray-200 rounded-r">→</span>}
              pageCount={Math.ceil(maintenanceTypes.length / itemsPerPage)}
              onPageChange={handlePageClickMaintenance}
              containerClassName={"flex space-x-2"}
              pageLinkClassName={"px-4 py-2 bg-gray-100 border rounded-md hover:bg-primary hover:text-white cursor-pointer"}
              activeLinkClassName={"bg-primary text-white"}
              disabledLinkClassName={"text-gray-400 cursor-not-allowed"}
              pageRangeDisplayed={1}  // Show 4 pages at a time
              marginPagesDisplayed={1}  // Show 1 page at the start/end of the page range
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdditionalService;
