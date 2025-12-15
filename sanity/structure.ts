import {StructureBuilder} from 'sanity/structure'
import {PageBuilderToolComponent} from './plugins/pageBuilder'

export const structure = (S: StructureBuilder) =>
  S.list()
    .title('Content')
    .items([
      // Default document types
      ...S.documentTypeListItems().filter(
        (listItem) => !['page'].includes(listItem.getId() || '')
      ),
      S.divider(),
      // Page Builder as a custom item
      S.listItem()
        .title('📄 Page Builder')
        .id('page-builder')
        .child(
          S.component(PageBuilderToolComponent).id('page-builder')
        ),
      S.divider(),
      // Page documents
      S.documentTypeListItem('page').title('Pages'),
    ])
