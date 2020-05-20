import React, { memo, useCallback, ChangeEvent } from "react"
import format from "date-fns/format"
import { Column } from "material-table"
import { Link, Select, MenuItem, TableRow, TableCell } from "@material-ui/core"
import IconEdit from "@material-ui/icons/Edit"
import DateFnsUtils from "@date-io/date-fns"
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers"
import { ru } from "date-fns/locale"
import { Pagination, OrderDirection } from "@api/common"
import { Article } from "@api/articles"
import { Table } from "@features/core"

import { ARTICLE_TYPES_RECORD } from "../lib"

type ArticlesTableProps = {
  data: Article[]
  dateEnd: Date | null
  dateStart: Date | null
  isLoading: boolean
  pagination: Pagination
  type: Article["type"]
  onChangePage: (page: number) => void
  onChangeRowsPerPage: (pageSize: number) => void
  onChangeSelectFilter: (type: Article["type"]) => void
  onClickEditArticle: (id: number) => void
  onOrderChange: (
    orderBy: keyof Article,
    orderDirection: OrderDirection,
  ) => void
  onRowDelete: (tag: Article) => Promise<void>
  onDateEndChange: (date: Date | null) => void
  onDateStartChange: (date: Date | null) => void
}

export function ArticlesTable(props: ArticlesTableProps) {
  const {
    data,
    dateEnd,
    dateStart,
    isLoading,
    pagination,
    type,
    onChangePage,
    onChangeRowsPerPage,
    onChangeSelectFilter,
    onClickEditArticle,
    onDateEndChange,
    onDateStartChange,
    onOrderChange,
    onRowDelete,
  } = props

  const handleOrderChange = (
    orderBy: number,
    orderDirection: OrderDirection,
  ) => {
    const { field } = columns[orderBy]
    onOrderChange(field as keyof Article, orderDirection)
  }

  const handleRowDelete = (tag: Article) => onRowDelete(tag)

  const handleClickEditAtion = (
    _event: unknown,
    article: Article | Article[],
  ) => {
    if (Array.isArray(article)) {
      return
    }
    onClickEditArticle(article.id)
  }

  const notEmptyData = !!data.length

  return (
    <Table
      data={data}
      columns={columns}
      isLoading={isLoading}
      components={{
        FilterRow: () => (
          <ArticlesTableFilters
            type={type}
            dateStart={dateStart}
            dateEnd={dateEnd}
            onFilterChanged={onChangeSelectFilter}
            onDateStartChange={onDateStartChange}
            onDateEndChange={onDateEndChange}
          />
        ),
      }}
      page={pagination.page - 1}
      totalCount={pagination.total_items}
      options={{
        toolbar: false,
        sorting: notEmptyData,
        filtering: true,
        paging: notEmptyData,
        pageSize: pagination.page_size,
        pageSizeOptions: pagination.page_size_options,
      }}
      editable={{
        onRowDelete: handleRowDelete,
      }}
      actions={[
        {
          icon: () => <IconEdit />,
          tooltip: "Редактирование статьи",
          onClick: handleClickEditAtion,
        },
      ]}
      onOrderChange={handleOrderChange}
      onChangePage={onChangePage}
      onChangeRowsPerPage={onChangeRowsPerPage}
    />
  )
}

type ArticlesTableFiltersProps = {
  dateStart: Date | null
  dateEnd: Date | null
  type: Article["type"]
  onFilterChanged: (type: Article["type"]) => void
  onDateStartChange: (date: Date | null) => void
  onDateEndChange: (date: Date | null) => void
}

const ArticlesTableFilters = memo((props: ArticlesTableFiltersProps) => {
  const {
    dateStart,
    dateEnd,
    type,
    onFilterChanged,
    onDateStartChange,
    onDateEndChange,
  } = props

  const handleSelectChange = useCallback(
    (event: ChangeEvent<{ name?: string; value: unknown }>) =>
      onFilterChanged(event.target.value as Article["type"]),
    [onFilterChanged],
  )

  return (
    <TableRow>
      <TableCell />
      <TableCell>
        <Select
          name="type"
          value={type}
          fullWidth={true}
          onChange={handleSelectChange}
        >
          {Object.keys(ARTICLE_TYPES_RECORD).map((type) => (
            <MenuItem key={type} value={type}>
              {ARTICLE_TYPES_RECORD[type]}
            </MenuItem>
          ))}
        </Select>
      </TableCell>
      <TableCell />
      <TableCell />
      <TableCell>
        <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ru}>
          <DatePicker
            variant="dialog"
            margin="none"
            inputVariant="standard"
            inputProps={{}}
            label="С"
            format="dd/MM/yyyy"
            disableFuture={true}
            size="small"
            value={dateStart}
            onChange={onDateStartChange}
          />
          <DatePicker
            variant="dialog"
            margin="none"
            inputVariant="standard"
            label="По"
            disableFuture={true}
            format="dd/MM/yyyy"
            size="small"
            value={dateEnd}
            onChange={onDateEndChange}
          />
        </MuiPickersUtilsProvider>
      </TableCell>
      <TableCell />
      <TableCell />
    </TableRow>
  )
})

const columns: Column<Article>[] = [
  {
    field: "type",
    title: "Раздел",
    sorting: false,
    render: (article) => ARTICLE_TYPES_RECORD[article.type],
  },
  {
    field: "title",
    title: "Заголовок",
    filtering: false,
    render: (article) =>
      article.url ? (
        <Link href={article.url} target="_blank">
          {article.title}
        </Link>
      ) : (
        article.title
      ),
  },
  {
    field: "authors",
    title: "Автор(ы)",
    sorting: false,
    filtering: false,
    render: (article) =>
      article.authors
        .reduce<string[]>((names, author) => [...names, author.name], [])
        .join(", "),
  },
  {
    field: "published_at",
    title: "Дата публикации",
    defaultSort: "desc",
    filtering: false,
    type: "date",
    render: (article) =>
      article.published_at
        ? format(new Date(article.published_at), "dd.MM.yyyy HH:mm")
        : null,
  },
  {
    field: "updated_at",
    title: "Дата обновления",
    filtering: false,
    type: "date",
    render: (article) =>
      article.updated_at
        ? format(new Date(article.updated_at), "dd.MM.yyyy HH:mm")
        : null,
  },
  {
    field: "total_views",
    title: "Просмотров",
    type: "numeric",
    filtering: false,
  },
]
