import React, { ChangeEvent } from "react"
import TextField from "@material-ui/core/TextField"
import IconButton from "@material-ui/core/IconButton"
import InputAdornment from "@material-ui/core/InputAdornment"
import SearchRoundedIcon from "@material-ui/icons/SearchRounded"
import ClearRoundedIcon from "@material-ui/icons/ClearRounded"

type SearchFieldType = {
  fullWidth?: boolean
  searchText: string
  onChange: (searchText: string) => void
  onClear: () => void
}

export function SearchField(props: SearchFieldType) {
  const { fullWidth, searchText, onChange, onClear } = props

  const handleChange = (event: ChangeEvent<HTMLInputElement>) =>
    onChange(event.target.value)

  return (
    <TextField
      name="search"
      placeholder="Search"
      value={searchText}
      onChange={handleChange}
      variant="standard"
      fullWidth={fullWidth}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchRoundedIcon />
          </InputAdornment>
        ),
        endAdornment: (
          <InputAdornment position="end">
            <IconButton disabled={!searchText.length} onClick={onClear}>
              <ClearRoundedIcon />
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  )
}
