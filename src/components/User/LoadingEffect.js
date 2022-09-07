import UserApplicationsDetails from "./Applications";
const Loading = () =>{
    return(<>
    <main className='bg-gray-800'>
          <br />
          <br />
          <br />
          <br />
          <br />
          <div className='gap-1 text-white max-w-7xl m-auto p-2 block md:flex'>
            <div className='mt-6 w-100 md:w-4/12'>
              <div class='bg-gray-900 border border-blue-800 shadow rounded-md p-4 max-w-sm w-full mx-auto'>
                <div class='animate-pulse flex space-x-4'>
                  <div class='bg-gray-700 h-20 w-20 rounded'></div>
                  <div class='flex-1 space-y-6 py-1'>
                    <div class='h-2 bg-gray-700 rounded'></div>
                    <div class='space-y-3'>
                      <div class='grid grid-cols-3 gap-4'>
                        <div class='h-2 bg-gray-700 rounded col-span-2'></div>
                        <div class='h-2 bg-gray-700 rounded col-span-1'></div>
                      </div>
                      <div class='h-2 bg-gray-700 rounded'></div>
                    </div>
                  </div>
                </div>
                <br />
                <div class='animate-pulse flex space-x-4'>
                  <div class='flex-1 space-y-6 py-1'>
                    <div class='h-2 bg-gray-700 rounded'></div>
                    <div class='space-y-3'>
                      <div class='grid grid-cols-3 gap-4'>
                        <div class='h-2 bg-gray-700 rounded col-span-2'></div>
                        <div class='h-2 bg-gray-700 rounded col-span-1'></div>
                      </div>
                      <div class='h-2 bg-gray-700 rounded'></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-6 w-100 md:w-8/12">
              <UserApplicationsDetails />
            </div>
          </div>
        </main>
    </>);
}

export default Loading;