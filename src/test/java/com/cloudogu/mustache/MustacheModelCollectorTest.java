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

package com.cloudogu.mustache;

import com.google.common.collect.ImmutableSet;
import org.junit.jupiter.api.Test;

import java.util.List;
import java.util.Map;
import java.util.Set;

import static org.assertj.core.api.Assertions.assertThat;

class MustacheModelCollectorTest {

  private MustacheModelCollector collector;

  @Test
  void shouldReturnEmptyListIfNoProviders() {
    collector = new MustacheModelCollector(Set.of());
    Map<String, List<String>> result = collector.getModels();

    assertThat(result).hasSize(0);
  }

  @Test
  void shouldGetModelFromProvider() {
    collector = new MustacheModelCollector(ImmutableSet.of(new TestProvider()));
    Map<String, List<String>> result = collector.getModels();

    assertThat(result).hasSize(1);
    assertThat(result.get("TestModel")).containsOnly("TestProp1", "PropTest2");
  }

  static class TestProvider implements MustacheModelProvider {

    @Override
    public List<String> getModel() {
      return List.of("TestProp1", "PropTest2");
    }

    @Override
    public String getName() {
      return "TestModel";
    }
  }
}
