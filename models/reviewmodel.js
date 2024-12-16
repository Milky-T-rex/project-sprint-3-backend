const reviews = [
    {
        profile: "Image.png",
        userId: 1,
        name: "Sudawan",
        rating: 2,
        max_rating: 5,
        comment: "ชาร้านอร่อยมาก ปลูกที่ยอดดอย น้ำแข็งเย็นทุกก้อน ราคาคุ้มค่า ดื่มแล้วตาค้าง ดื่มแก้วเดียวคุ้มเลยค่ะ",
    },
    {
        profile: "Image.png",
        userId: 2,
        name: "Best",
        rating: 5,
        max_rating: 5,
        comment: "ชาร้านอร่อยมาก ปลูกที่ยอดดอย น้ำแข็งเย็นทุกก้อน ราคาคุ้มค่า ดื่มแล้วตาค้าง ดื่มแก้วเดียวคุ้มเลยค่ะ",
    },
    {
        profile: "Image.png",
        userId: 3,
        name: "Tong Tong",
        rating: 4,
        max_rating: 5,
        comment: "ชาร้านอร่อยมาก ปลูกที่ยอดดอย น้ำแข็งเย็นทุกก้อน ราคาคุ้มค่า ดื่มแล้วตาค้าง ดื่มแก้วเดียวคุ้มเลยค่ะ",
    },
    {
        profile: "Image.png",
        userId: 3,
        name: "Bu",
        rating: 4,
        max_rating: 5,
        comment: "ชาร้านอร่อยมาก ปลูกที่ยอดดอย น้ำแข็งเย็นทุกก้อน ราคาคุ้มค่า ดื่มแล้วตาค้าง ดื่มแก้วเดียวคุ้มเลยค่ะ",
    },
    {
        profile: "Image.png",
        userId: 3,
        name: "Nut",
        rating: 5,
        max_rating: 5,
        comment: "ชาร้านอร่อยมาก ปลูกที่ยอดดอย น้ำแข็งเย็นทุกก้อน ราคาคุ้มค่า ดื่มแล้วตาค้าง ดื่มแก้วเดียวคุ้มเลยค่ะ",
    },
];

// This function returns all the reviews
const getReviews = () => {
    return reviews;
};

export { getReviews };  // Use ES Module export