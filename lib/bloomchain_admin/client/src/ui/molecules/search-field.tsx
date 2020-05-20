import React, { memo, useCallback, ChangeEvent } from "react"
import TextField from "@material-ui/core/TextField"
import IconButton from "@material-ui/core/IconButton"
import InputAdornment from "@material-ui/core/InputAdornment"
import SearchRoundedIcon from "@material-ui/icons/SearchRounded"
import ClearRoundedIcon from "@material-ui/icons/ClearRounded"

type SearchFieldType = {
  query: string
  onChange: (query: string) => void
}

export const SearchField = memo(function SearchField(props: SearchFieldType) {
  const { query, onChange } = props

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => onChange(event.target.value),
    [onChange],
  )

  return (
    <TextField
      name="search"
      placeholder="Search"
      value={query}
      onChange={handleChange}
      variant="standard"
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchRoundedIcon />
          </InputAdornment>
        ),
        endAdornment: (
          <InputAdornment position="end">
            <IconButton disabled={!query.length}>
              <ClearRoundedIcon />
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  )
})
