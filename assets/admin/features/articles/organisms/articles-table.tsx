import React, { memo, useMemo, useCallback, ChangeEvent } from "react"
import format from "date-fns/format"
import { Column } from "material-table"
import { Link, Select, MenuItem, TableRow, TableCell } from "@material-ui/core"
import IconEdit from "@material-ui/icons/EditRounded"
import { encodeHTMLEntities } from "@lib/html"
import type { Pagination, OrderDirection } from "@api/common"
import type { Section } from "@api/sections"
import { Article } from "@api/articles"
import { Table } from "@features/core"

type ArticlesTableProps = {
  data: Article[]
  isLoading: boolean
  pagination: Pagination
  sections: Section[]
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
}

export function ArticlesTable(props: ArticlesTableProps) {
  const {
    data,
    isLoading,
    pagination,
    sections,
    type,
    onChangePage,
    onChangeRowsPerPage,
    onChangeSelectFilter,
    onClickEditArticle,
    onOrderChange,
    onRowDelete,
  } = props

  const columns = useMemo(() => createColumns(sections), [sections])

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
            sections={sections}
            onFilterChanged={onChangeSelectFilter}
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
  sections: Section[]
  type: Article["type"]
  onFilterChanged: (type: Article["type"]) => void
}

const ArticlesTableFilters = memo((props: ArticlesTableFiltersProps) => {
  const { sections, type, onFilterChanged } = props

  const handleSelectChange = useCallback(
    (event: ChangeEvent<{ name?: string; value: unknown }>) =>
      onFilterChanged(event.target.value as Article["type"]),
    [onFilterChanged],
  )

  return (
    <TableRow>
      <TableCell style={{ padding: "8px 5px" }} />
      <TableCell colSpan={6} style={{ padding: "8px 5px" }}>
        <Select
          name="type"
          value={type}
          fullWidth={false}
          onChange={handleSelectChange}
          style={{ fontSize: "14px" }}
        >
          {sections.map((section) => (
            <MenuItem key={section.slug} value={section.slug}>
              {section.name}
            </MenuItem>
          ))}
        </Select>
      </TableCell>
    </TableRow>
  )
})

function createColumns(sections: Section[]): Column<Article>[] {
  return [
    {
      field: "type",
      title: "Раздел",
      sorting: false,
      cellStyle: {
        padding: "8px 5px",
      },
      render: (article) => getArticleTypeName(sections, article.type),
    },
    {
      field: "title",
      title: "Заголовок",
      filtering: false,
      cellStyle: {
        padding: "8px 5px",
        width: "40%",
      },
      render: (article) =>
        article.url ? (
          <Link href={article.url} target="_blank">
            {encodeHTMLEntities(article.title)}
          </Link>
        ) : (
          encodeHTMLEntities(article.title)
        ),
    },
    {
      field: "authors",
      title: "Автор(ы)",
      sorting: false,
      filtering: false,
      cellStyle: {
        padding: "8px 5px",
      },
      render: (article) =>
        article.authors
          .reduce<string[]>((names, author) => [...names, author.name], [])
          .join(", "),
    },
    {
      field: "published_at",
      title: "Дата публикации",
      filtering: false,
      type: "date",
      cellStyle: {
        padding: "8px 5px",
      },
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
      cellStyle: {
        padding: "8px 5px",
      },
      render: (article) =>
        article.updated_at
          ? format(new Date(article.updated_at), "dd.MM.yyyy HH:mm")
          : null,
    },
    {
      field: "total_views",
      title: "Просмотров",
      type: "numeric",
      cellStyle: {
        padding: "8px 16px 8px 5px",
      },
      filtering: false,
    },
  ]
}

function getArticleTypeName(
  sections: Section[],
  article_type: Article["type"],
) {
  return (
    sections.find((section) => section.slug === article_type)?.name ??
    "По умолчанию"
  )
}
