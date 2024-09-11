/*
 * Copyright (c) 2020 - present Cloudogu GmbH
 *
 * This program is free software: you can redistribute it and/or modify it under
 * the terms of the GNU Affero General Public License as published by the Free
 * Software Foundation, version 3.
 *
 * This program is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
 * FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more
 * details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see https://www.gnu.org/licenses/.
 */

import React, { FC } from "react";
import { Page, ErrorPage, Loading } from "@scm-manager/ui-components";
import { useMustacheModels } from "./useMustacheModels";
import Expandable from "./Expandable";
import { Trans, useTranslation } from "react-i18next";

const MustacheDocPage: FC = () => {
  const [t] = useTranslation("plugins");
  const { isLoading, error, data } = useMustacheModels();

  if (isLoading) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return <Loading />;
  }

  if (error) {
    return (
      <ErrorPage
        error={error}
        title={t("scm-mustache-documentation-plugin.mustacheDocPage.error.title")}
        subtitle={"scm-mustache-documentation-plugin.mustacheDocPage.error.subtitle"}
      />
    );
  }

  if (!data) {
    return null;
  }

  return (
    <Page
      title={t("scm-mustache-documentation-plugin.mustacheDocPage.pageTitle")}
      subtitle={t("scm-mustache-documentation-plugin.mustacheDocPage.pageSubtitle")}
    >
      <div className="content">
        <div className="mb-4">
          <Trans t={t} i18nKey={"scm-mustache-documentation-plugin.mustacheDocPage.introduction"}>
            See the <a href="https://mustache.github.io/mustache.5.html">documentation</a>
          </Trans>
        </div>
        {Object.keys(data).length > 0 ? (
          <>
            <h4 className="title">{t("scm-mustache-documentation-plugin.mustacheDocPage.modelTitle")}</h4>
            <div>
              {Object.entries(data).map(([name, propertyNames]) => (
                <ModelDoc name={name} propertyNames={propertyNames} />
              ))}
            </div>
          </>
        ) : null}
      </div>
    </Page>
  );
};

type RenderModelProps = {
  name: string;
  propertyNames: string[];
};

const ModelDoc: FC<RenderModelProps> = ({ name, propertyNames }) => {
  const [t] = useTranslation("plugins");

  return (
    <Expandable header={t(`mustacheDoc.${name}.name`, name)} className={"mb-4"}>
      <>
        <PropertyTable name={name} propertyNames={propertyNames} />
        <ModelExample name={name} />
      </>
    </Expandable>
  );
};

const PropertyTable: FC<RenderModelProps> = ({ name, propertyNames }) => {
  const [t] = useTranslation("plugins");

  return (
    <table>
      <thead>
        <tr>
          <th>{t("scm-mustache-documentation-plugin.mustacheDocPage.nameHeader")}</th>
          <th>{t("scm-mustache-documentation-plugin.mustacheDocPage.descriptionHeader")}</th>
        </tr>
      </thead>
      <tbody>
        {propertyNames.map(propertyName => {
          return (
            <tr>
              <td>{propertyName}</td>
              <td>
                {t(
                  `mustacheDoc.${name}.properties.${propertyName}`,
                  t("scm-mustache-documentation-plugin.mustacheDocPage.missingDescription")
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

type ModelExampleProps = {
  name: string;
};

const ModelExample: FC<ModelExampleProps> = ({ name }) => {
  const [t] = useTranslation("plugins");

  const exampleContent = t(`mustacheDoc.${name}.exampleContent`, "");
  if (exampleContent.length === 0) {
    return null;
  }

  const exampleIntroduction = t(`mustacheDoc.${name}.exampleIntroduction`, "");

  return (
    <>
      <h5 className={"title"}>{t("scm-mustache-documentation-plugin.mustacheDocPage.exampleTitle")}</h5>
      {exampleIntroduction.length > 0 ? <p>{exampleIntroduction}</p> : null}
      <pre>{exampleContent}</pre>
    </>
  );
};

export default MustacheDocPage;
