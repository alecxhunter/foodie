import moment from 'moment';

const formatDate = (date) => {
    if (!date) return '';
    return moment(date).format('YYYY-MM-DD');
};

export default formatDate;