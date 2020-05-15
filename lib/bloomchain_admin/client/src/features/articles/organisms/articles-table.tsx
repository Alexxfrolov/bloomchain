import React, { memo, useMemo, useCallback, ChangeEvent } from "react"
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
  isLoading: boolean
  pagination: Pagination
  searchText: string
  title: string
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
  onSearchChange: (query: string) => void
}

export const ArticlesTable = memo(function ArticlesTable(
  props: ArticlesTableProps,
) {
  const {
    data,
    isLoading,
    pagination,
    searchText,
    title,
    type,
    onChangePage,
    onChangeRowsPerPage,
    onChangeSelectFilter,
    onClickEditArticle,
    onOrderChange,
    onRowDelete,
    onSearchChange,
  } = props

  const handleOrderChange = useCallback(
    (orderBy: number, orderDirection: OrderDirection) => {
      const { field } = columns[orderBy]
      onOrderChange(field as keyof Article, orderDirection)
    },
    [onOrderChange],
  )

  const handleRowDelete = useCallback((tag: Article) => onRowDelete(tag), [
    onRowDelete,
  ])

  const handleClickEditAtion = useCallback(
    (_event, article: Article | Article[]) => {
      if (Array.isArray(article)) {
        return
      }
      onClickEditArticle(article.id)
    },
    [onClickEditArticle],
  )

  const notEmptyData = useMemo(() => !!data.length, [data])

  return (
    <Table
      title={title}
      data={data}
      columns={columns}
      isLoading={isLoading}
      components={{
        FilterRow: () =>
          notEmptyData ? (
            <ArticlesTableFilterSelect
              type={type}
              onFilterChanged={onChangeSelectFilter}
            />
          ) : null,
      }}
      page={pagination.page - 1}
      totalCount={pagination.total_items}
      options={{
        tableLayout: "fixed",
        search: notEmptyData,
        sorting: notEmptyData,
        searchText,
        searchFieldStyle: {
          width: "400px",
        },
        debounceInterval: 250,
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
      onSearchChange={onSearchChange}
      onOrderChange={handleOrderChange}
      onChangePage={onChangePage}
      onChangeRowsPerPage={onChangeRowsPerPage}
    />
  )
})

type ArticlesTableFilterSelectProps = {
  type: Article["type"]
  onFilterChanged: (type: Article["type"]) => void
}

const ArticlesTableFilterSelect = memo(
  (props: ArticlesTableFilterSelectProps) => {
    const { type, onFilterChanged } = props

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
          {/* <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ru}>
            <DatePicker
              variant="dialog"
              margin="none"
              inputVariant="outlined"
              label="Дата начала"
              format="dd/MM/yyyy"
              size="small"
              value={values.since}
              onChange={handleDateStartChange}
            />
            <DatePicker
              variant="dialog"
              margin="none"
              inputVariant="outlined"
              label="Дата окончания"
              format="dd/MM/yyyy"
              size="small"
              value={values.until}
              onChange={handleDateEndChange}
            />
          </MuiPickersUtilsProvider> */}
        </TableCell>
        <TableCell />
        <TableCell />
      </TableRow>
    )
  },
)

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
    type: "numeric",
    render: (article) =>
      article.published_at
        ? format(new Date(article.published_at), "dd.MM.yyyy HH:mm")
        : null,
  },
  {
    field: "updated_at",
    title: "Дата обновления",
    filtering: false,
    type: "numeric",
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
