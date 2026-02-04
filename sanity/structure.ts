import {StructureBuilder} from 'sanity/structure'

export const structure = (S: StructureBuilder) =>
  S.list()
    .title('Content')
    .items([
      // Websites Folder
      S.listItem()
        .title('Websites')
        .child(
          S.documentTypeList('site')
            .title('All Websites')
            .child((siteId) =>
              S.list()
                .title('Site Content')
                .items([
                  S.listItem()
                    .title('Pages')
                    .child(
                      S.documentList()
                        .title('Pages')
                        .filter('_type == "page" && site._ref == $siteId')
                        .params({siteId})
                        .initialValueTemplates([
                          S.initialValueTemplateItem('page-by-site', {siteId}),
                        ]),
                    ),
                  S.listItem()
                    .title('Home Page')
                    .child(
                      S.documentList()
                        .title('Home Page')
                        .filter('_type == "homePage" && site._ref == $siteId')
                        .params({siteId})
                        .initialValueTemplates([
                          S.initialValueTemplateItem('homePage-by-site', {siteId}),
                        ]),
                    ),
                  S.listItem()
                    .title('Posts')
                    .child(
                      S.documentList()
                        .title('Posts')
                        .filter('_type == "post" && site._ref == $siteId')
                        .params({siteId})
                        .initialValueTemplates([
                          S.initialValueTemplateItem('post-by-site', {siteId}),
                        ]),
                    ),
                  S.listItem()
                    .title('Blog Listings')
                    .child(
                      S.documentList()
                        .title('Blog Listings')
                        .filter('_type == "blogListingPage" && site._ref == $siteId')
                        .params({siteId})
                        .initialValueTemplates([
                          S.initialValueTemplateItem('blogListingPage-by-site', {siteId}),
                        ]),
                    ),
                  S.divider(),
                  S.listItem()
                    .title('Authors')
                    .child(
                      S.documentList()
                        .title('Authors')
                        .filter('_type == "author" && site._ref == $siteId')
                        .params({siteId})
                        .initialValueTemplates([
                          S.initialValueTemplateItem('author-by-site', {siteId}),
                        ]),
                    ),
                  S.listItem()
                    .title('Categories')
                    .child(
                      S.documentList()
                        .title('Categories')
                        .filter('_type == "category" && site._ref == $siteId')
                        .params({siteId})
                        .initialValueTemplates([
                          S.initialValueTemplateItem('category-by-site', {siteId}),
                        ]),
                    ),
                  S.listItem()
                    .title('Collections')
                    .child(
                      S.documentList()
                        .title('Collections')
                        .filter('_type == "collections" && site._ref == $siteId')
                        .params({siteId})
                        .initialValueTemplates([
                          S.initialValueTemplateItem('collections-by-site', {siteId}),
                        ]),
                    ),
                  S.listItem()
                    .title('Theme Settings')
                    .child(
                      S.documentList()
                        .title('Theme Settings')
                        .filter('_type == "themeSettings" && site._ref == $siteId')
                        .params({siteId})
                        .initialValueTemplates([
                          S.initialValueTemplateItem('themeSettings-by-site', {siteId}),
                        ]),
                    ),
                  S.divider(),
                  S.documentListItem().schemaType('site').id(siteId).title('Site Settings'),
                ]),
            ),
        ),
      S.divider(),
      // All other documents (Global view)
      ...S.documentTypeListItems().filter(
        (listItem) =>
          ![
            'site',
            'page',
            'homePage',
            'post',
            'blogListingPage',
            'author',
            'category',
            'themeSettings',
            'collections',
          ].includes(listItem.getId() || ''),
      ),
      S.divider(),
      // Global Lists for shared content or admins
      S.documentTypeListItem('page').title('All Pages'),
    ])
