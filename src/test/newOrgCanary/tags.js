import { createtag, editCreatedTag, deleteCreatedTag } from '../../toolboxes/tags.toolbox';

const tagsFeeder = require('../../feeder/tags.feeder');

describe('CRUDing Tags by Member', () => {
  test('Cruding for Location Type', async () => {
    await createtag('@tagCategoryLocation', tagsFeeder.locationName, '@locationTag'); // for creating tags
    await editCreatedTag('@locationTag', tagsFeeder.newLocation, '@locationEditedTag');// for editing tags
    await deleteCreatedTag('@locationEditedTag', tagsFeeder.newLocation);// for deleting tags
  });

  test('Cruding for Department Type', async () => {
    await createtag('@tagCategoryDepartment', tagsFeeder.departmentName, '@departmentTag');
    await editCreatedTag('@departmentTag', tagsFeeder.newDepartment, '@departmentEditedTag');
    await deleteCreatedTag('@departmentEditedTag', tagsFeeder.newDepartment);
  });

  test('cruding for Role type', async () => {
    await createtag('@tagCategoryRole', tagsFeeder.roleName, '@roleTag');
    await editCreatedTag('@roleTag', tagsFeeder.newRole, '@roleEditedTag');
    await deleteCreatedTag('@roleEditedTag', tagsFeeder.newRole);
  });

  test('cruding for Custom type', async () => {
    await createtag('@tagCategoryCustom', tagsFeeder.customName, '@customTag');
    await editCreatedTag('@customTag', tagsFeeder.newCustom, '@customEditedTag');
    await deleteCreatedTag('@customEditedTag', tagsFeeder.newCustom);
  });
});
