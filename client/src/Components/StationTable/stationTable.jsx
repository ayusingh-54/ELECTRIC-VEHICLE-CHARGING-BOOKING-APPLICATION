import Table from "react-bootstrap/Table";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import "./stationTable.css";

const StationTable = ({ allStations, deleteStation, bookSlot, role }) => {
  const navigate = useNavigate();
  const handleBookslot = (id) => {
    navigate("/book-slot/" + id);
  };

  return (
    <div className="ev-table-container">
      <Table className="" striped bordered hover>
        <thead>
          <tr>
            <th>No.</th>
            <th>Station Name</th>
            <th>Location</th>
            <th>Total Ports</th>
            <th>Rate/hr</th>
            {role !== "ev-station" && <th>Book Slots</th>}

            {role !== "user" && <th> Delete Station</th>}
          </tr>
        </thead>
        <tbody>
          {allStations.map((elem, index) => {
            return (
              <tr key={elem._id}>
                <td>{index + 1}</td>
                <td>{elem.stationName}</td>
                <td>{elem.location}</td>
                <td>{elem.totalPorts}</td>
                <td>{elem.pricePerHour}</td>
                {role !== "ev-station" && (
                  <td>
                    <button
                      onClick={() => {
                        handleBookslot(elem._id);
                      }}
                      className="book-slot-btn"
                    >
                      Book Slots
                    </button>
                  </td>
                )}

                {role !== "user" && (
                  <td>
                    <button
                      onClick={() => {
                        deleteStation(elem._id);
                      }}
                      className="delete-station-btn"
                    >
                      Delete Station
                    </button>
                  </td>
                )}
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
};

StationTable.propTypes = {
  allStations: PropTypes.array,
  deleteStation: PropTypes.func,
  bookSlot: PropTypes.func,
  role: PropTypes.string,
};

export default StationTable;
