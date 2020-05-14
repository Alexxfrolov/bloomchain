import React, { memo, useCallback } from "react"
import format from "date-fns/format"
import { Column } from "material-table"
import Link from "@material-ui/core/Link"
import IconEdit from "@material-ui/icons/Edit"
import { Pagination, OrderDirection } from "@api/common"
import { Article } from "@api/articles"
import { Table } from "@features/core"

type ArticlesTableProps = {
  data: Article[]
  isLoading: boolean
  pagination: Pagination
  searchText: string
  title: string
  onChangePage: (page: number) => void
  onChangeRowsPerPage: (pageSize: number) => void
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
    onChangePage,
    onChangeRowsPerPage,
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

  return (
    <Table
      title={title}
      data={data}
      columns={columns}
      isLoading={isLoading}
      page={pagination.page - 1}
      totalCount={pagination.total_items}
      options={{
        searchText,
        search: true,
        debounceInterval: 500,
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

const columns: Column<Article>[] = [
  {
    field: "title",
    title: "Заголовок",
    cellStyle: { width: "50%" },
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
    title: "Автор",
    sorting: false,
    cellStyle: { width: "25%" },
    render: (article) =>
      article.authors
        .reduce<string[]>((names, author) => [...names, author.name], [])
        .join(", "),
  },
  {
    field: "published_at",
    title: "Дата публикации",
    defaultSort: "desc",
    cellStyle: { width: "1%", whiteSpace: "nowrap" },
    render: (article) =>
      format(new Date(article.published_at ?? ""), "dd.MM.yyyy HH:mm"),
  },
  {
    field: "updated_at",
    title: "Обновлено",
    cellStyle: { width: "1%", whiteSpace: "nowrap" },
    render: (article) =>
      format(new Date(article.updated_at ?? ""), "dd.MM.yyyy HH:mm"),
  },
  {
    field: "total_views",
    title: "Просмотров",
    type: "numeric",
    cellStyle: { width: "1%", whiteSpace: "nowrap" },
  },
]
