var fakeFlights = [
  {
    totalco2e: 108,
    co2e: 54,
    co2e_unit: "kg",
    seatClass: "economy",
    oneWay: 2,
    travelDate: [
      {
        month: 8,
        year: 2022,
        echoTime: 1661983200000,
      },
    ],
    echoTimeDate: 1661983200000,
    workDays: "3",
    legs: [
      {
        from: "ARN",
        to: "OSL",
        co2e: 54.074260125,
      },
    ],
    priority: 2,
    purpose: "Lecture",
    ID: "p1",
    project: "PROJECT1",
    flightID: "fID-8801",
  },
  {
    totalco2e: 520,
    co2e: 520,
    co2e_unit: "kg",
    seatClass: "economy",
    oneWay: 1,
    travelDate: [
      {
        month: 0,
        year: 2022,
        echoTime: 1640991600000,
      },
    ],
    echoTimeDate: 1640991600000,
    workDays: "10",
    legs: [
      {
        from: "ARN",
        to: "ORY",
        co2e: 294.120711049,
      },
      {
        from: "ORY",
        to: "TXL",
        co2e: 226.597814058,
      },
    ],
    priority: 3,
    purpose: "Conference and research",
    ID: "p2",
    project: "PROJECT2",
    flightID: "fID-5281",
  },
  {
    totalco2e: 1536,
    co2e: 768,
    co2e_unit: "kg",
    seatClass: "business",
    oneWay: 2,
    travelDate: [
      {
        month: 1,
        year: 2022,
        echoTime: 1643670000000,
      },
    ],
    echoTimeDate: 1643670000000,
    workDays: "5",
    legs: [
      {
        from: "ARN",
        to: "AHN",
        co2e: 768.2064913046514,
      },
    ],
    priority: 3,
    purpose: "Research",
    ID: "p3",
    project: "PROJECT3",
    flightID: "fID-9712",
  },
  {
    totalco2e: 2230,
    co2e: 2230,
    co2e_unit: "kg",
    seatClass: "business",
    oneWay: 1,
    travelDate: [
      {
        month: 4,
        year: 2022,
        echoTime: 1651356000000,
      },
    ],
    echoTimeDate: 1651356000000,

    workDays: "8",
    legs: [
      {
        from: "ARN",
        to: "LIS",
        co2e: 1222.7392538688598,
      },
      {
        from: "LIS",
        to: "CPH",
        co2e: 1008.02649649403,
      },
    ],
    priority: 3,
    purpose: "Research",
    ID: "p1",
    project: "PROJECT1",
    flightID: "fID-7994",
  },
  {
    totalco2e: 423,
    co2e: 423,
    co2e_unit: "kg",
    seatClass: "economy",
    oneWay: 1,
    travelDate: [
      {
        month: 10,
        year: 2022,
        echoTime: 1667257200000,
      },
    ],
    echoTimeDate: 1667257200000,
    workDays: "3",
    legs: [
      {
        from: "NKT",
        to: "ARN",
        co2e: 423.82542135937507,
      },
    ],
    priority: 1,
    purpose: "Research related",
    ID: "p2",
    project: "PROJECT2",
    flightID: "fID-0134",
  },
  {
    totalco2e: 1662,
    co2e: 831,
    co2e_unit: "kg",
    seatClass: "economy",
    oneWay: 2,
    travelDate: [
      {
        month: 4,
        year: 2022,
        echoTime: 1651356000000,
      },
    ],
    echoTimeDate: 1651356000000,
    workDays: "10",
    legs: [
      {
        from: "ARN",
        to: "MIA",
        co2e: 831.8097905766928,
      },
    ],
    priority: 4,
    purpose: "Conference and meetings",
    ID: "p3",
    project: "PROJECT3",
    flightID: "fID-4045",
  },
  {
    totalco2e: 4156,
    co2e: 2078,
    co2e_unit: "kg",
    seatClass: "economy",
    oneWay: 2,
    travelDate: [
      {
        month: 4,
        year: 2022,
        echoTime: 1651356000000,
      },
    ],
    echoTimeDate: 1651356000000,
    workDays: "9",
    legs: [
      {
        from: "ARN",
        to: "RMA",
        co2e: 2078.8852224375,
      },
    ],
    priority: 1,
    purpose: "Lecture",
    ID: "p1",
    project: "PROJECT1",
    flightID: "fID-7689",
  },
  {
    totalco2e: 444,
    co2e: 222,
    co2e_unit: "kg",
    seatClass: "business",
    oneWay: 2,
    travelDate: [
      {
        month: 7,
        year: 2022,
        echoTime: 1659304800000,
      },
    ],
    echoTimeDate: 1659304800000,
    workDays: "2",
    legs: [
      {
        from: "ARN",
        to: "CPH",
        co2e: 222.97182500047,
      },
    ],
    priority: 2,
    purpose: "Research",
    ID: "p2",
    project: "PROJECT2",
    flightID: "fID-0410",
  },
  {
    totalco2e: 1844,
    co2e: 922,
    co2e_unit: "kg",
    seatClass: "first",
    oneWay: 2,
    travelDate: [
      {
        month: 5,
        year: 2022,
        echoTime: 1654034400000,
      },
    ],
    echoTimeDate: 1654034400000,
    workDays: "7",
    legs: [
      {
        from: "ARN",
        to: "LAX",
        co2e: 922.0284152418976,
      },
    ],
    priority: 4,
    purpose: "Conference",
    ID: "p3",
    project: "PROJECT3",
    flightID: "fID-4096",
  },
  {
    totalco2e: 124,
    co2e: 124,
    co2e_unit: "kg",
    seatClass: "business",
    oneWay: 1,
    travelDate: [
      {
        month: 6,
        year: 2022,
        echoTime: 1656626400000,
      },
    ],
    echoTimeDate: 1656626400000,
    workDays: "3",
    legs: [
      {
        from: "OSL",
        to: "TXL",
        co2e: 124.60991048499999,
      },
    ],
    priority: 4,
    purpose: "Conducting research",
    ID: "p1",
    project: "PROJECT2",
    flightID: "fID-6172",
  },
  {
    totalco2e: 452,
    co2e: 226,
    co2e_unit: "kg",
    seatClass: "economy",
    oneWay: 2,
    travelDate: [
      {
        month: 2,
        year: 2022,
        echoTime: 1646089200000,
      },
    ],
    echoTimeDate: 1646089200000,
    workDays: "3",
    legs: [
      {
        from: "ARN",
        to: "LHR",
        co2e: 226.91911559157776,
      },
    ],
    priority: 2,
    purpose: "Conference",
    ID: "p1",
    project: "PROJECT2",
    flightID: "fID-4487",
  },
  {
    totalco2e: 1066,
    co2e: 533,
    co2e_unit: "kg",
    seatClass: "first",
    oneWay: 2,
    travelDate: [
      {
        month: 1,
        year: 2022,
        echoTime: 1643670000000,
      },
    ],
    echoTimeDate: 1643670000000,
    workDays: "1",
    legs: [
      {
        from: "BMA",
        to: "KRN",
        co2e: 533.70892549,
      },
    ],
    priority: 1,
    purpose: "Meeting colleagues",
    ID: "p3",
    project: "PROJECT3",
    flightID: "fID-8703",
  },
  {
    totalco2e: 242,
    co2e: 121,
    co2e_unit: "kg",
    seatClass: "economy",
    oneWay: 2,
    travelDate: [
      {
        month: 9,
        year: 2022,
        echoTime: 1664575200000,
      },
    ],
    echoTimeDate: 1664575200000,
    workDays: "1",
    legs: [
      {
        from: "MMX",
        to: "HEL",
        co2e: 121.55678071875,
      },
    ],
    priority: 2,
    purpose: "Research",
    ID: "p2",
    project: "PROJECT2",
    flightID: "fID-4047",
  },
  {
    totalco2e: 1154,
    co2e: 1154,
    co2e_unit: "kg",
    seatClass: "economy",
    oneWay: 1,
    travelDate: [
      {
        month: 11,
        year: 2022,
        echoTime: 1669849200000,
      },
    ],
    echoTimeDate: 1669849200000,
    workDays: "7",
    legs: [
      {
        from: "ARN",
        to: "HEL",
        co2e: 56.048756203125,
      },
      {
        from: "HEL",
        to: "HKG",
        co2e: 1098.24263915625,
      },
    ],
    priority: 4,
    purpose: "Conference",
    ID: "p3",
    project: "PROJECT3",
    flightID: "fID-9203",
  },
  
  {
    totalco2e: 152,
    co2e: 76,
    co2e_unit: "kg",
    seatClass: "economy",
    oneWay: 2,
    travelDate: [
      {
        month: 2,
        year: 2022,
        echoTime: 1646089200000,
      },
    ],
    echoTimeDate: 1646089200000,
    workDays: "4",
    legs: [
      {
        from: "ARN",
        to: "CPH",
        co2e: 76.88730754687501,
      },
    ],
    priority: 2,
    purpose: "Research",
    ID: "p1",
    project: "PROJECT2",
    flightID: "fID-4369",
  },
  {
    totalco2e: 1050,
    co2e: 525,
    co2e_unit: "kg",
    seatClass: "business",
    oneWay: 2,
    travelDate: [
      {
        month: 6,
        year: 2022,
        echoTime: 1656626400000,
      },
    ],
    echoTimeDate: 1656626400000,
    workDays: "2",
    legs: [
      {
        from: "ARN",
        to: "BRU",
        co2e: 525.1630246057,
      },
    ],
    priority: 2,
    purpose: "Disputation event",
    ID: "p3",
    project: "PROJECT3",
    flightID: "fID-0507",
  },
];
export default fakeFlights;