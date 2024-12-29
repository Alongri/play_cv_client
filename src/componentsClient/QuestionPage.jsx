
const QuestionPage = () => {
  return (
    <div className="container text-center">
      <h1 className="my-5">Question Number 666 {">:-)"}</h1>
      <div>
        <input className="form-control mb-5 w-50 mx-auto" type="text"></input>
        <input className="form-control mb-5 w-25 mx-auto" type="file"></input>
      </div>
      <div className="d-flex justify-content-between w-50 m-auto">
        <button className="btn fw-bold btn-primary px-4">Prev</button>
        <button className="btn fw-bold btn-primary px-4">Next</button>
      </div>
    </div>
  )
}

export default QuestionPage
