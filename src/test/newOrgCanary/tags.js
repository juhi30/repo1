import { createtags, editCreatedTags, deleteCreatedTags } from '../../toolboxes/tags.toolbox';

const tagsFeeder = require('../../feeder/tags.feeder');

describe('CRUDing Tags by Member', () => {
  test('Cruding for Location Type', async () => {
    await createtags('@tagCategoryLocation', tagsFeeder.locationName, '@locationTag', tagsFeeder.locationName); // for creating tags
    await editCreatedTags('@locationTag', tagsFeeder.newLocation, '@locationEditedTag', tagsFeeder.newLocation);// for editing tags
    await deleteCreatedTags('@locationEditedTag', tagsFeeder.newLocation);// for deleting tags
  });

  test('Cruding for Department Type', async () => {
    await createtags('@tagCategoryDepartment', tagsFeeder.departmentName, '@departmentTag', tagsFeeder.departmentName);
    await editCreatedTags('@departmentTag', tagsFeeder.newDepartment, '@departmentEditedTag', tagsFeeder.newDepartment);
    await deleteCreatedTags('@departmentEditedTag', tagsFeeder.newDepartment);
  });

  test('cruding for Role type', async () => {
    await createtags('@tagCategoryRole', tagsFeeder.roleName, '@roleTag', tagsFeeder.roleName);
    await editCreatedTags('@roleTag', tagsFeeder.newRole, '@roleEditedTag', tagsFeeder.newRole);
    await deleteCreatedTags('@roleEditedTag', tagsFeeder.newRole);
  });

  test('cruding for Custom type', async () => {
    await createtags('@tagCategoryCustom', tagsFeeder.customName, '@customTag', tagsFeeder.customName);
    await editCreatedTags('@customTag', tagsFeeder.newCustom, '@customEditedTag', tagsFeeder.newCustom);
    await deleteCreatedTags('@customEditedTag', tagsFeeder.newCustom);
  });
});
