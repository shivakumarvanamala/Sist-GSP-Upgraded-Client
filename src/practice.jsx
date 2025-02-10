import { useState } from "react";


export default function Practice(){

  const [comments, setComments] = useState({"prevComments":[{ date: "2024-03-01", comment: "This is the first comment." },
  { date: "2024-03-02", comment: "This is the second comment." },
  { date: "2024-03-03", comment: "This is the third comment." },{ date: "2024-03-01", comment: "This is the first comment." },
  { date: "2024-03-02", comment: "This is the second comment." },
  { date: "2024-03-03", comment: "This is the third comment." },{ date: "2024-03-01", comment: "This is the first comment." },
  { date: "2024-03-02", comment: "This is the second comment." },
  { date: "2024-03-03", comment: "This is the third comment." },{ date: "2024-03-01", comment: "This is the first comment." },
  { date: "2024-03-02", comment: "This is the second comment." },
  { date: "2024-03-03", comment: "This is the third comment." },]})
  const handleAddComments = (eve) => {
    (prev) =>
      setComments({
        ...comments,
        [eve.target.name]: eve.target.value,
      });
    console.log(comments.addComments);  }
  return (
        <>
             <div className="bg-white rounded-xl shadow-xl mb-4 min-w-72 min-h-80 max-h-80">
              <div className="bg-[#9e1c3f] text-white py-2 rounded-t-xl mb-4 mx-0">
                <h1 className="text-2xl font-bold text-center">Comments</h1>
              </div>
              <div className="flex flex-col h-full">
                <div className="overflow-auto h-[60%]">
                  <div className="p-2 mb-1 text-lg border-b-2 border-gray-400 whitespace-pre-wrap overflow-y-scroll max-h-48">
                    {/* Display previous comments */}
                    {comments.prevComments &&
                      comments.prevComments.map((comment, index) => (
                        <div key={index} className="mb-2">
                        <div className="flex flex-col ">
                          <p className="flex justify-end text-xs">
                          {comment.date}
                          </p>
                          <div className="flex justify-end">
                          <p className="bg-slate-300 rounded-xl p-2">
                          {comment.comment}
                          </p>
                          </div>
                          
                          </div>
                          {/* <span className="font-bold">{comment.date}:</span> {comment.comment} */}
                        </div>
                      ))}
                  </div>
                </div>
                <div className="flex items-center p-2">
                  <textarea
                    className="flex-grow h-[2.5rem] resize rounded-full p-2 text-lg border-2 border-gray-400 outline-none bg-[#e2e8f0] overflow-hidden"
                    id="addComments"
                    name="addComments"
                    placeholder="Type a message..."
                    value={comments.addComments}
                    onChange={(eve) => {
                      handleAddComments(eve);
                      seteditedComments(eve.target.value);
                    }}
                  />
                </div>
              </div>
            </div>





        </>
    )
}