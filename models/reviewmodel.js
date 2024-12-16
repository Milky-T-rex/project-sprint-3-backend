const reviews = 
  
  [
    {
      "profile": "Image.png",
      "userId": 1,
      "name": "Sudawan",
      "rating": 5,
      "max_rating": 5,
      "comment": "ชานี้เข้มข้น สดชื่น น้ำแข็งกรอบ รสชาติไม่หวานเกินไป ดื่มได้เรื่อยๆ ราคาไม่แพง คุ้มค่ามากค่ะ!"
    },
    {
      "profile": "Image.png",
      "userId": 2,
      "name": "Best",
      "rating": 5,
      "max_rating": 5,
      "comment": "ชากลมกล่อม น้ำแข็งเย็นกรอบ รสชาติสดชื่นไม่หวานเกินไป คุ้มค่าทุกบาท ราคาเหมาะสม!"
    },
    {
      "profile": "Image.png",
      "userId": 3,
      "name": "Tong Tong",
      "rating": 4,
      "max_rating": 5,
      "comment": "ชารสชาติเข้มข้น น้ำแข็งเย็นกรอบ รสหวานไม่เลี่ยน ราคาไม่แพง คุ้มค่า!"
    },
    {
      "profile": "Image.png",
      "userId": 4,
      "name": "Bu",
      "rating": 4,
      "max_rating": 5,
      "comment": "ชาอร่อย สดชื่น น้ำแข็งเย็นไม่ละลายเร็ว รสชาติผ่อนคลาย ราคาไม่แพง แต่บางครั้งขมไปหน่อย!"
    },
    {
      "profile": "Image.png",
      "userId": 5,
      "name": "Nut",
      "rating": 5,
      "max_rating": 5,
      "comment": "ชาสดชื่น น้ำแข็งเย็นกรอบ รสชาติกลมกล่อมไม่หวานเกินไป ราคาเหมาะสม คุ้มค่ามาก!"
    }
  ]
  
    

  
  
// This function returns all the reviews
const getReviews = () => {
  return reviews;
};

export { getReviews };  // Use ES Module export