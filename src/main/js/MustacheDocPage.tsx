/*
 * MIT License
 *
 * Copyright (c) 2020-present Cloudogu GmbH and Contributors
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
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
