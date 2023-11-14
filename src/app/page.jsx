"use client"
import { Button, TextField, ToggleButton, ToggleButtonGroup } from '@mui/material'
import Image from 'next/image'
import React from 'react'

export default function Home() {
  const [fileType, setFileType] = React.useState("gb")
  const [downType, setDownType] = React.useState("mbit")
  const [downSpeed, setDownSpeed] = React.useState("")
  const [fileSize, setFileSize] = React.useState("")
  const [resultVisibility, setResultVisibility] = React.useState(false)
  const [timeAsSecond, setTimeAsSecond] = React.useState(0);

  function calcTime() {
    switch(fileType) {
      case ("gb"):
        switch(downType) {
          case ("mbit"):
            setTimeAsSecond(parseInt(fileSize)*1024/(parseInt(downSpeed)/8))
            break
          case ("gbit"):
            setTimeAsSecond(parseInt(fileSize)*1024/((parseInt(downSpeed)*1024)/8))
            break
          default:
            setTimeAsSecond(0)
            break
        }
        break
      case ("mb"):
        switch(downType) {
          case ("mbit"):
            setTimeAsSecond(parseInt(fileSize)/(parseInt(downSpeed)/8))
            break
          case ("gbit"):
            setTimeAsSecond(parseInt(fileSize)/((parseInt(downSpeed)*1024)/8))
            break
          default:
            setTimeAsSecond(0)
            break
        }
        break
      default:
        setTimeAsSecond(0)
        break
    }
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-200">
      <h1 className="text-center p-2 text-5xl font-extrabold tracking-wide text-indigo-700">
        Download Calculator
      </h1>

      <div className="flex flex-col items-center max-w-md mx-auto bg-white p-8 rounded-md shadow-md">
        <ToggleButtonGroup
          color="primary"
          value={downType}
          exclusive
          onChange={(event, newDownType) => {
            setDownType(newDownType);
          }}
          aria-label="Download Type"
          className="mb-4"
        >
          <ToggleButton value="mbit">Mbit</ToggleButton>
          <ToggleButton value="gbit">Gbit</ToggleButton>
        </ToggleButtonGroup>

        <TextField
          variant="outlined"
          label="Download Speed"
          required={true}
          onChange={(event) => {
            setDownSpeed(event.target.value);
          }}
          className="mb-4"
        />

        <TextField
          variant="outlined"
          label="File Size"
          required={true}
          onChange={(event) => {
            setFileSize(event.target.value);
          }}
          className="mb-4"
        />

        <ToggleButtonGroup
          color="primary"
          value={fileType}
          exclusive
          onChange={(event, newType) => {
            setFileType(newType);
          }}
          aria-label="File Size Type"
          className="mb-4"
        >
          <ToggleButton value="gb">GB</ToggleButton>
          <ToggleButton value="mb">MB</ToggleButton>
        </ToggleButtonGroup>

        <Button
          variant="outlined"
          onClick={() => {
            setResultVisibility(true);
            calcTime();
          }}
        >
          Calculate
        </Button>
      </div>

      {resultVisibility && (
        <div className="m-4 bg-gray-100 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-center mb-4">Results!</h2>
          <div className="text-center">
            <p className="text-lg">
              Your approximately download time will be:{" "}
              <span className="font-bold">{timeAsSecond.toFixed(0)}</span> seconds.
            </p>
            <p className="text-lg">
              If we consider 10% speed loss then your download time will be:{" "}
              <span className="font-bold">
                {(timeAsSecond * 10 / 9).toFixed(0)}
              </span>{" "}
              seconds.
            </p>
          </div>
        </div>
      )}
    </main>
  )
}
