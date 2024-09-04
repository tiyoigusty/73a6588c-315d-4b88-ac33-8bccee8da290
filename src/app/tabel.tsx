"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { motion } from "framer-motion";
import { useState } from "react";
import {
  IoIosArrowDropdownCircle,
  IoIosArrowDropupCircle,
} from "react-icons/io";
import { DialogAddData } from "./addData";
import { DialogDeleteData } from "./deleteData";
import { DialogUpdateData } from "./updateData";

async function fetchEmployees(page = 1, limit = 6) {
  try {
    const response = await axios.get(
      `/api/employees?page=${page}&limit=${limit}`
    );
    return response.data;
  } catch (err) {
    console.error(err);
  }
}

export default function EmployeeTable() {
  const [page, setPage] = useState(1);
  const [sortField, setSortField] = useState<
    "firstName" | "lastName" | "position"
  >("firstName");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const {
    data: employeesData = { data: [], total: 0, totalPages: 1 },
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["employees", page],
    queryFn: () => fetchEmployees(page),
  });

  const { data: employees, totalPages } = employeesData;

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching data...</div>;

  const sortedEmployees = [...employees].sort((a, b) => {
    if (sortField === "firstName") {
      return sortOrder === "asc"
        ? a.firstName.localeCompare(b.firstName)
        : b.firstName.localeCompare(a.firstName);
    } else if (sortField === "lastName") {
      return sortOrder === "asc"
        ? a.lastName.localeCompare(b.lastName)
        : b.lastName.localeCompare(a.lastName);
    } else {
      return sortOrder === "asc"
        ? a.position.localeCompare(b.position)
        : b.position.localeCompare(a.position);
    }
  });

  const handleSort = (field: "firstName" | "lastName" | "position") => {
    if (sortField === field) {
      setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  const handlePageClick = (pageNum: number) => setPage(pageNum);

  const handleNextPage = () =>
    setPage((prev) => Math.min(prev + 1, totalPages));
  const handlePrevPage = () => setPage((prev) => Math.max(prev - 1, 1));

  return (
    <div className="overflow-x-auto">
      <div className="flex justify-end gap-3 mr-5 mb-5">
        <DialogAddData refetch={refetch}></DialogAddData>
      </div>

      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b text-start">
              <div className="flex justify-between items-center">
                First Name
                <button onClick={() => handleSort("firstName")}>
                  <motion.div
                    initial={{ rotate: 0 }}
                    animate={{
                      rotate:
                        sortField === "firstName"
                          ? sortOrder === "asc"
                            ? 180
                            : -180
                          : 0,
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {sortField === "firstName" ? (
                      sortOrder === "asc" ? (
                        <IoIosArrowDropupCircle size={20} />
                      ) : (
                        <IoIosArrowDropdownCircle size={20} />
                      )
                    ) : (
                      <IoIosArrowDropupCircle size={20} />
                    )}
                  </motion.div>
                </button>
              </div>
            </th>
            <th className="py-2 px-4 border-b text-start">
              <div className="flex justify-between items-center">
                Last Name
                <button onClick={() => handleSort("lastName")}>
                  <motion.div
                    initial={{ rotate: 0 }}
                    animate={{
                      rotate:
                        sortField === "lastName"
                          ? sortOrder === "asc"
                            ? 180
                            : -180
                          : 0,
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {sortField === "lastName" ? (
                      sortOrder === "asc" ? (
                        <IoIosArrowDropupCircle size={20} />
                      ) : (
                        <IoIosArrowDropdownCircle size={20} />
                      )
                    ) : (
                      <IoIosArrowDropupCircle size={20} />
                    )}
                  </motion.div>
                </button>
              </div>
            </th>
            <th className="py-2 px-4 border-b text-start">
              <div className="flex justify-between items-center">
                Position
                <button onClick={() => handleSort("position")}>
                  <motion.div
                    initial={{ rotate: 0 }}
                    animate={{
                      rotate:
                        sortField === "position"
                          ? sortOrder === "asc"
                            ? 180
                            : -180
                          : 0,
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {sortField === "position" ? (
                      sortOrder === "asc" ? (
                        <IoIosArrowDropupCircle size={20} />
                      ) : (
                        <IoIosArrowDropdownCircle size={20} />
                      )
                    ) : (
                      <IoIosArrowDropupCircle size={20} />
                    )}
                  </motion.div>
                </button>
              </div>
            </th>
            <th className="py-2 px-4 border-b text-start">Phone</th>
            <th className="py-2 px-4 border-b text-start">Email</th>
            <th className="py-2 px-4 border-b text-start">Actions</th>
          </tr>
        </thead>
        <tbody>
          {sortedEmployees.map((data, index) => (
            <tr key={data.id} className="hover:bg-gray-100">
              <td className="py-2 px-4 border-b text-start">
                {data.firstName}
              </td>
              <td className="py-2 px-4 border-b text-start">{data.lastName}</td>
              <td className="py-2 px-4 border-b text-start">{data.position}</td>
              <td className="py-2 px-4 border-b text-start">{data.phone}</td>
              <td className="py-2 px-4 border-b text-start">{data.email}</td>
              <td className="py-2 px-4 border-b text-start flex gap-3">
                <DialogUpdateData dataId={data.id} />
                <DialogDeleteData id={data.id} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-center gap-5 absolute bottom-0 left-0 right-0 mb-5">
        <button
          className=" px-4 py-2 bg-gray-200 rounded"
          onClick={handlePrevPage}
          disabled={page === 1}
        >
          Previous
        </button>

        <div className="flex gap-2">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => handlePageClick(index + 1)}
              className={`px-4 py-2 rounded ${
                page === index + 1 ? "bg-red-400 text-white" : "bg-gray-200"
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>

        <button
          className=" px-4 py-2 bg-gray-200 rounded"
          onClick={handleNextPage}
          disabled={page === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}
