import React , { useState } from 'react'

export default function PaymentInfomation() {

    const [content, setContent] = useState('1');
    let output = '';

    if(content === '1'){
        output = (<div>

            <div className="tabs">
                <div className="tab tab-active text-blue-700 border-b-2 font-bold">Mobile Banking</div> 
                <div className="tab tab-bordered" onClick={() => setContent('2')}>QR Scan</div> 
                <div className="tab tab-bordered" onClick={() => setContent('3')}>Visa , Mastercard</div>
            </div>
            
            <div className='w-2/3 ml-10 mt-5'>
                    <div className="form-control">
                        <label className="label cursor-pointer justify-start">
                            <input type="radio" name="radio-10" className="radio checked:bg-green-500 " checked />
                            <img className='w-8 h-8 rounded-lg ml-3'
                            src='https://play-lh.googleusercontent.com/AyX675vwNz8X2sYUTSrjUTRVzzXMZUW_nMQ8Vk__Nabj6zQ7s7We-bpZbFmoYf7e2YM' alt=''/>
                            <span className="label-text ml-3">Pay with K PLUS</span> 
                        </label>
                    </div>
                    <div className="form-control">
                        <label className="label cursor-pointer justify-start">
                            <input type="radio" name="radio-10" className="radio checked:bg-blue-700" checked />
                            <img className='w-8 h-8 rounded-lg ml-3'
                            src='https://play-lh.googleusercontent.com/UK3VbIDBtjpRos1MTyvVf5wFtU6yElq-6hvKqlQZgh73HG9B76SVB54UcSOa17jsSbw' alt=''/>
                            <span className="label-text ml-3 ">ธนาคารกรุงเทพ</span> 
                        </label>
                    </div>
                    <div className="form-control">
                        <label className="label cursor-pointer justify-start">
                            <input type="radio" name="radio-10" className="radio checked:bg-sky-500" checked />
                            <img className='w-8 h-8 rounded-lg ml-3'
                            src='https://play-lh.googleusercontent.com/ftHwT3bHgdHHzuxQQW8e_vgjdZvtjPVbbSaBMZf966Ys6NUtyPB_poAjaTkDa1eDF40' alt=''/>
                            <span className="label-text ml-3 ">Krungthai NEXT</span> 
                        </label>
                    </div>
                    <div className="form-control">
                        <label className="label cursor-pointer justify-start">
                            <input type="radio" name="radio-10" className="radio checked:bg-purple-700" checked />
                            <img className='w-8 h-8 rounded-lg ml-3'
                            src='https://play-lh.googleusercontent.com/j-9a3HbVZoX337-MLdkmYt75yUfN5ahis8rOnE09972cFLdVn7Z5Dzu3Guo8ldUv2H4x' alt=''/>
                            <span className="label-text ml-3 ">ธนาคารไทยพาณิชย์</span> 
                        </label>
                    </div>
                    <div className="form-control">
                        <label className="label cursor-pointer justify-start">
                            <input type="radio" name="radio-10" className="radio checked:bg-yellow-400" checked />
                            <img className='w-8 h-8 rounded-lg ml-3'
                            src='https://play-lh.googleusercontent.com/ovSLL4E--Mo_nJg4XHE8k_9KYCpAbn6FB0FLMgzl6lyNubIJoJxdvWyEnM7sN02DD5I' alt=''/>
                            <span className="label-text ml-3 ">ธนาคารกรุงศรีอยุธยา</span> 
                        </label>
                    </div>
            </div>

        </div>);
    }
    else if(content === '2'){
        output = (<div>

            <div className="tabs">
                <div className="tab tab-bordered " onClick={() => setContent('1')}>Mobile Banking</div> 
                <div className="tab tab-active text-blue-700 border-b-2 font-bold">QR Scan</div> 
                <div className="tab tab-bordered" onClick={() => setContent('3')}>Visa , Mastercard</div>
            </div>

            <div className="htmlForm-control w-2/3 ml-10 mt-5">
                <label className="label cursor-pointer justify-start">
                <input type="checkbox" required className="checkbox-md" />
                <span className="label-text pl-5">
                    ยืนยันการจ่ายเงินด้วย QR Scan{" "}
                    <span className="text-red-600">*</span>
                </span>
                </label>
            </div>
            

            </div>);

    }
    else if(content === '3'){
        output = (<div>

            <div className="tabs">
                <div className="tab tab-bordered " onClick={() => setContent('1')}>Mobile Banking</div> 
                <div className="tab tab-bordered" onClick={() => setContent('2')}>QR Scan</div> 
                <div className="tab tab-active text-blue-700 border-b-2 font-bold">Visa , Mastercard</div>
            </div>

            <div className='mt-5 ml-5'>
                <div className="form-control">
                        <label className="label cursor-pointer justify-start">
                            <input type="radio" name="radio-10" className="radio checked:bg-blue-700" checked />
                            <img aria-hidden="true" className="w-10 h-7 mr-2 rounded-lg ml-5" viewBox="0 0 660 203" fill="none" xmlns="http://www.w3.org/2000/svg" src='https://play-lh.googleusercontent.com/DB-E7TSbWobxBzjS6IenXRXhkg2gNOM_685qcnKoPs9D6I9Y_4MdbQi9nhRvRCC9m5g'/>
                
                            <span className="label-text ml-3 ">Pay with Visa</span> 
                        </label>
                    </div>
                    <div className="form-control">
                        <label className="label cursor-pointer justify-start">
                            <input type="radio" name="radio-10" className="radio checked:bg-yellow-400" checked />
                            <img aria-hidden="true" className="w-10 h-7 mr-2 rounded-lg ml-5" viewBox="0 0 660 203" fill="none" xmlns="http://www.w3.org/2000/svg" src='https://www.investopedia.com/thmb/F8CKM3YkF1fmnRCU2g4knuK0eDY=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/MClogo-c823e495c5cf455c89ddfb0e17fc7978.jpg'/>
                            <span className="label-text ml-3 ">Pay with MasterCard</span> 
                        </label>
                    </div>
       

            </div>
            

            </div>);

    }


  return (
    <>
        <div className='ml-y'>
            

            <div  className='my-5'>
                {output}
            </div>
        </div>

    </>
  )
}
