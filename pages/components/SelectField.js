import React, { Fragment, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { BiChevronDown, BiCheck } from 'react-icons/bi'


function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}
const dummyOpt =
{
  name: "Please Select",
  value: ""
}

const SelectField = ({ options }) => {
  const [selected, setSelected] = useState(options ? options[0] : dummyOpt)

  return (
    <Listbox value={selected} onChange={setSelected}>
      {({ open }) => (
        <>
          {/* <Listbox.Label className="block text-sm font-medium text-gray-700">Assigned to</Listbox.Label> */}
          <div className="mt-1 relative mx-2">
            <Listbox.Button className="relative w-full dark:bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-gold-100 focus:border-gold-200 sm:text-sm">
              <span className="flex items-center">
                {/* <img src={selected.avatar} alt="" className="flex-shrink-0 h-6 w-6 rounded-full" /> */}
                <span className="ml-0 block truncate">{selected.name}</span>
              </span>
              <span className="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <BiChevronDown className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </span>
            </Listbox.Button>

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-56 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                {options && options.map((option, key) => (
                  <Listbox.Option
                    key={key + 1}
                    className={({ active }) =>
                      classNames(
                        active ? 'text-white bg-indigo-600' : 'text-gray-900',
                        'cursor-default select-none relative py-2 pl-3 pr-9'
                      )
                    }
                    value={option}
                  >
                    {({ selected, active }) => (
                      <>
                        <div className="flex items-center">
                          {option.avatar && <img src={option.avatar} alt="" className="flex-shrink-0 h-6 w-6 rounded-full" />}
                          <span
                            className={classNames(selected ? 'font-semibold' : 'font-normal', 'ml-1 block truncate')}
                          >
                            {option.name}
                          </span>
                        </div>

                        {selected ? (
                          <span
                            className={classNames(
                              active ? 'text-white' : 'text-indigo-600',
                              'absolute inset-y-0 right-0 flex items-center pr-4'
                            )}
                          >
                            <BiCheck className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  )
}
export default SelectField