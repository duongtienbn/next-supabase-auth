// pages/example.js

// Sử dụng getServerSideProps để lấy dữ liệu từ API hoặc database
export async function getServerSideProps() {
  // Trả về dữ liệu từ server-side
  const data = await fetchDataFromSomeAPI(); // Hàm fetchDataFromSomeAPI() giả định lấy dữ liệu từ API

  return {
    props: {
      data // Dữ liệu được trả về sẽ được truyền vào component như props
    }
  };
}

// Component sử dụng dữ liệu được truyền từ getServerSideProps
function Example({ data }) {
  return (
    <div>
      <h1>Server-Side Rendering</h1>
      <p>Data: {data}</p>
    </div>
  );
}

export default Example;