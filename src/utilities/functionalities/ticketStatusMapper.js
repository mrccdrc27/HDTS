// ticketStatusMapper.js

export const mapStatusForAdmin = (status) => {
  switch (status) {
    case 'Pending':
      return 'New';
    default:
      return status;
  }
};
