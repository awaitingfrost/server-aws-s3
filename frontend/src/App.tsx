
import ImageUpload from './ImageUpload';
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react'
import FileUpload from './VideosUpload';

function App() {

  const categories = [
    {
      name: 'Multi Photos',
      component:<ImageUpload />

    },
    {
      name: 'Upload File',
      component:<FileUpload/> 
    },
  ]
  return (
    <div className='bg-black text-white py-28 px-20'>
      <p className='text-2xl font-bold'>Server-Aws-S3-Integration</p>
    <div className="flex h-screen w-full justify-center pt-24 px-4">
      <div className="w-full">
        <TabGroup>
          <TabList className="flex gap-4">
            {categories.map(({ name }) => (
              <Tab
                key={name}
                className="rounded-full py-1 px-3 text-sm/6 font-semibold text-white focus:outline-none data-[selected]:bg-white/10 data-[hover]:bg-white/5 data-[selected]:data-[hover]:bg-white/10 data-[focus]:outline-1 data-[selected]:outline-white"
              >
                {name}
              </Tab>
            ))}
          </TabList>
          <TabPanels className="mt-3">
            {categories.map(({ name, component }) => (
              <TabPanel key={name} className="rounded-xl bg-white/5 p-3">
               {component}
              </TabPanel>
            ))}
          </TabPanels>
        </TabGroup>
      </div>
    </div>
    </div>
  )
}

export default App
