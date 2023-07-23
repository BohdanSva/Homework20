const addReview = (rating, text) => {
    return `INSERT INTO reviews
                (rating, text)
                    VALUES
                        ("${rating}", "${text}")`;
};

// const readReview = (id) => {
//     return `SELECT id, rating, text
//                 FROM reviews
//                     WHERE id LIKE ("${id}")`;
// };

module.exports = addReview;