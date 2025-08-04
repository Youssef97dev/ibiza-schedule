"use client";
import { DataTable } from "mantine-datatable";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaMapMarkerAlt, FaExternalLinkAlt } from "react-icons/fa";

const reservations = [
  {
    id: "1",
    date: "6th August 2025",
    time: "23:30",
    pax: 9,
    payment: "",
    place: "IT IBIZA",
    website: "https://it-ibiza.com/",
    location: "https://maps.app.goo.gl/wZX3pXnohQ9dWAFq8",
  },
  {
    id: "2",
    date: "7th August 2025",
    time: "22:00",
    pax: 8,
    payment: "Credit card details provided",
    place: "CASA MACA",
    website: "https://www.casamaca.com/en/",
    location: "https://maps.app.goo.gl/NoEBvjdaeV3bBHwu5",
  },
  {
    id: "3",
    date: "8th August 2025",
    time: "15:15",
    pax: 9,
    payment: "Guarantee of 540€ (60€ per pax)",
    place: "EL CHIRINGUITO",
    website: "https://elchiringuitoibiza.com/",
    location: "https://maps.app.goo.gl/kK5gMrTRbmJeYAbE9",
  },
  {
    id: "4",
    date: "9th August 2025",
    time: "14:30",
    pax: 9,
    payment: "Deposit charged of 450€",
    place: "BLUE MARLIN IBIZA",
    website: "https://www.bluemarlinibiza.com/",
    location: "https://maps.app.goo.gl/8RJR75NpbxCHyGgd9",
  },
  {
    id: "5",
    date: "9th August 2025",
    time: "22:45",
    pax: 9,
    payment: "Pre payment of 500€",
    place: "ZUMA IBIZA",
    website: "https://www.zumarestaurant.com/en/ibiza",
    location: "https://maps.app.goo.gl/hc8Y37nXfTiAx3Wq8",
  },
  {
    id: "6",
    date: "10th August 2025",
    time: "13:30",
    pax: 9,
    payment: "",
    place: "JUAN Y ANDREA",
    website: "https://juanyandrea.com/",
    location: "https://maps.app.goo.gl/qBcRCp4vLUTVsNob7",
  },
  {
    id: "6",
    date: "10th August 2025",
    time: "20:30",
    pax: 4,
    payment: "Pre payment of 600€ (150€ per pax)",
    place: "LIO IBIZA",
    website: "https://www.liogroup.com/ibiza",
    location: "https://maps.app.goo.gl/T2FdLebVAAw69ePr7",
  },
  {
    id: "7",
    date: "12th August 2025",
    time: "22:45",
    pax: 9,
    payment: "They will send link for the deposit few days before",
    place: "CIPRIANI IBIZA",
    website: "https://www.cipriani.com/cipriani-ibiza",
    location: "https://maps.app.goo.gl/DBmdsz3EKkrwrT3BA",
  },
];

//Icons
import { HiRefresh } from "react-icons/hi";
import { IoMdAdd } from "react-icons/io";

const Table = () => {
  const [page, setPage] = useState(1);
  const PAGE_SIZES = [10, 20, 30, 50, 100];
  const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
  const [tables, setTables] = useState(reservations);
  const [initialRecords, setInitialRecords] = useState(reservations);
  const [recordsData, setRecordsData] = useState(initialRecords);
  const [isLoading, setIsLoading] = useState(false);

  const [search, setSearch] = useState("");
  const [sortStatus, setSortStatus] = useState({
    columnAccessor: "id",
    direction: "asc",
  });

  useEffect(() => {
    setPage(1);
  }, [pageSize]);

  useEffect(() => {
    const from = (page - 1) * pageSize;
    const to = from + pageSize;
    setRecordsData([...initialRecords.slice(from, to)]);
  }, [page, pageSize, initialRecords]);

  useEffect(() => {
    setInitialRecords(() => {
      return tables.filter((table) => {
        return (
          table.date.toString().toLowerCase().includes(search.toLowerCase()) ||
          table.time.toString().toLowerCase().includes(search.toLowerCase()) ||
          table.pax.toString().toLowerCase().includes(search.toLowerCase()) ||
          table.place.toString().toLowerCase().includes(search.toLowerCase()) ||
          table.payment.toLowerCase().includes(search.toLowerCase())
        );
      });
    });
  }, [search, tables]);
  return (
    <div>
      <div className="panel mt-6 mx-2">
        <div className="mb-5 flex flex-col gap-5 md:flex-row md:items-center">
          <h5 className="text-lg font-semibold">
            Reservations Mr Tarik Hanich
          </h5>
          <div className="ml-auto flex space-x-4">
            <input
              type="text"
              className="form-input w-auto border border-gray-700 py-2 px-4 rounded-full focus:outline-none"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
        <div className="datatables" style={{ overflowX: "auto" }}>
          <DataTable
            noRecordsText="No results match your search query"
            highlightOnHover
            rowStyle={() => ({
              height: "60px", // Set your desired row height
            })}
            className="table-hover whitespace-nowrap"
            records={recordsData}
            columns={[
              {
                accessor: "place",
                title: "Restaurant",
                sortable: true,
                cellsClassName: "font-medium",
              },
              { accessor: "date", title: "Date", sortable: true },
              {
                accessor: "time",
                title: "Time",
                sortable: true,
                /*render: ({ status }) => (
                  <div className="font-medium">
                    <span
                      className={`${
                        status === "Reserved"
                          ? "bg-yellow-600"
                          : status === "Available"
                          ? "bg-green-600"
                          : "bg-red-600"
                      } p-2 rounded-md  text-white`}
                    >{`${status}`}</span>
                  </div>
                ),*/
              },
              { accessor: "pax", title: "Guests", sortable: true },
              { accessor: "payment", title: "Payment", sortable: true },
              {
                accessor: "action",
                title: "Action",
                render: ({ website, location }) => (
                  <div className="font-medium flex justify-center items-center gap-5">
                    <Link href={website}>
                      <FaExternalLinkAlt size={18} />
                    </Link>
                    <Link href={location}>
                      <FaMapMarkerAlt size={18} />
                    </Link>
                  </div>
                ),
              },
            ]}
            totalRecords={initialRecords.length}
            recordsPerPage={pageSize}
            page={page}
            onPageChange={(p) => setPage(p)}
            recordsPerPageOptions={PAGE_SIZES}
            onRecordsPerPageChange={setPageSize}
            sortStatus={sortStatus}
            onSortStatusChange={setSortStatus}
            minHeight={200}
            paginationText={({ from, to, totalRecords }) =>
              `Showing  ${from} to ${to} of ${totalRecords} tables`
            }
          />
        </div>
      </div>
    </div>
  );
};

export default Table;
