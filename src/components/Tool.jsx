import {
  useState
} from "react"
import pb from "@/pb"
import {
  useQuery,
  useQueryClient
} from "@tanstack/react-query";
import axios from "axios"

export default function Tool() {
  const [profileId,
    setProfileId] = useState("")
  const [activePay,
    setActivePay] = useState("")
  const [approveStatus,
    setApproveStatus] = useState("idle")

  const [filter,
    setFilter] = useState(`profile.activePackage=''`)
  const queryClient = useQueryClient()
  const {
    data,
    isLoading,
    isError,
    error,
  } = useQuery(["pays"], () =>
    pb.records.getFullList("manualPayments", 999999, {
      filter,
      expand: 'package, profile'
    })
  );

  const handleSearch = async () => {
    if (!profileId) return
    const filter = `profile.activePackage='' && profile='${profileId}'`
    setFilter(filter)
    queryClient.invalidateQueries("pays");
  }

  const handleApprove = async () => {
    try {
      setApproveStatus("loading")
      const approve = await axios({
        method: "post",
        url: `${import.meta.env.VITE_API_URL}/pay-approve/${activePay}/?token=${pb.authStore.token}`,
        data: {
          paymentId: activePay
        },
      });
      setApproveStatus("success")
      queryClient.invalidateQueries("pays");
    } catch (e) {
      console.log(e)
      setApproveStatus("failed")
    }
  }
  return (
    <>
    <div className="m-2 bg-white px-4 py-2 grid grid-cols-[1fr_auto] gap-2 shadow rounded">
     <input className="formInput" type="text" value={profileId} onChange={() => setProfileId(event.target.value)} />
      <button
      onClick={handleSearch}
      className="text-white bg-indigo-500 px-3 py-2 rounded">
    Search
    </button>
  </div>
  {
    isLoading ?
    <center>Loading...</center>:
    isError ?
    <center>Error while load</center>:
    <>
    {
      data.map((payment) => {
        return(
          <div
            onClick={() => setActivePay(payment.id)}
            className="shadow bg-white p-3 grid grid-cols-1 gap-4 m-2">
      <div className="">
  <p className="abcd">
Name: {" "} {payment["@expand"].profile.name}
            </p>
  <p className="abcd">
Phone No: {" "} {payment["@expand"].profile.number}
            </p>
  <p className="abcd">
Profile ID: {" "} {payment["@expand"].profile.id}
            </p>
  <p className="abcd">
package: {" "} {payment["@expand"].package.name}
            </p>
                    <p className="text-green-500 text-xl">
           Amount: {" "} {payment.amount}
            </p>
          {activePay === payment.id &&
              <div className='mt-2 grid lg:grid-cols-2 gap-3'>
  <img className="w-full border"
                src={pb.records.getFileUrl(payment, payment.screenshoot1)} />
  <img className="w-full border"
              src={pb.records.getFileUrl(payment, payment.screenshoot2)} />
                  <button
              onClick={handleApprove}
              className="bg-indigo-500 text-white rounded px-3 py-2">
 {approveStatus === "loading" ? "Approving...": approveStatus === "success" ? "Approved": "Approve" } < /button> < /div >
              }
            </div>
          </div>
        )
        })
} < />
} < />
)
}