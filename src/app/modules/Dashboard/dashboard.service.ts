import prisma from "../../utils/prisma";
import moment from "moment";

const getUserRegistrationTrends = async () => {
  const startDate = moment().startOf("month").toDate();
  const endDate = moment().endOf("month").toDate();
  const dateFormat = "MM-DD";

  // Group users by the specified time frame and count registrations
  const data = await prisma.user.groupBy({
    by: ["createdAt"],
    where: {
      createdAt: {
        gte: startDate,
        lte: endDate,
      },
    },
    _count: {
      id: true,
    },
    orderBy: {
      createdAt: "asc",
    },
  });

  // Format data for chart
  const result = data.map((user) => ({
    date: moment(user.createdAt).format(dateFormat),
    count: user._count.id,
  }));

  return result;
};

const monthlyTotalUsers = async () => {
  const startDate = moment().startOf("month").toDate();
  const endDate = moment().endOf("month").toDate();

  // Count total users registered within the specific month
  const totalUsersCount = await prisma.user.count({
    where: {
      createdAt: {
        gte: startDate,
        lte: endDate,
      },
    },
  });

  return {
    month: moment().format("YYYY-MM"),
    count: totalUsersCount,
  };
};

const getUserByRole = async () => {
  const data = await prisma.user.groupBy({
    by: ["role"],
    _count: {
      id: true,
    },
    orderBy: {
      role: "asc",
    },
  });

  const result = data.map((item) => ({
    role: item.role,
    count: item._count.id,
  }));

  return result;
};

const totalUser = async () => {
  const result = await prisma.user.count();

  return result;
};

const totalBookings = async () => {
  const result = await prisma.booking.count();

  return result;
};

const totalBookingsByUser = async (userId: string) => {
  const result = await prisma.booking.count({
    where: {
      userId: userId,
    },
  });

  return result;
};

const bookingsByUser = async (userId: string) => {
  const dateFormat = "MM-DD";

  const data = await prisma.booking.groupBy({
    by: ["createdAt"],
    where: {
      userId: userId,
    },
    _count: {
      id: true,
    },
    orderBy: {
      createdAt: "asc",
    },
  });

  const result = data.map((booking) => ({
    date: moment(booking.createdAt).format(dateFormat),
    count: booking._count.id,
  }));

  return result;
};

const totalFlatPostByUser = async (userId: string) => {
  const result = await prisma.flat.count({
    where: {
      userId: userId,
    },
  });

  return result;
};

const flatPostByUser = async (userId: string) => {
  const dateFormat = "MM-DD";

  const data = await prisma.flat.groupBy({
    by: ["createdAt"],
    where: {
      userId: userId,
    },
    _count: {
      id: true,
    },
    orderBy: {
      createdAt: "asc",
    },
  });

  const result = data.map((booking) => ({
    date: moment(booking.createdAt).format(dateFormat),
    count: booking._count.id,
  }));

  return result;
};

export const dashboardServices = {
  getUserRegistrationTrends,
  monthlyTotalUsers,
  getUserByRole,
  totalUser,
  totalBookings,
  totalBookingsByUser,
  bookingsByUser,
  totalFlatPostByUser,
  flatPostByUser,
};
