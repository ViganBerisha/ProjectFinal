export default function generateID(randomIndexNumber){
    return (Date.now() + randomIndexNumber) + (Math.floor(Math.random() * 100000)).toString();
}