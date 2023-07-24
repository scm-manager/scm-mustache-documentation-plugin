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

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.github.sdorra.jse.ShiroExtension;
import org.github.sdorra.jse.SubjectAware;
import org.jboss.resteasy.mock.MockHttpRequest;
import org.jboss.resteasy.mock.MockHttpResponse;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import sonia.scm.web.RestDispatcher;

import java.io.IOException;
import java.net.URISyntaxException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.when;

@ExtendWith({MockitoExtension.class, ShiroExtension.class})
@SubjectAware(value = "Trainer Red")
class MustacheResourceTest {

  @Mock
  private MustacheModelCollector collector;

  @InjectMocks
  private MustacheResource resource;

  private RestDispatcher dispatcher;

  private final ObjectMapper mapper = new ObjectMapper();

  @BeforeEach
  void initDispatcher() {
    dispatcher = new RestDispatcher();
    dispatcher.addSingletonResource(resource);
  }

  @Test
  void shouldReturnOkWithModels() throws URISyntaxException, IOException {
    String modelName = "Test Model";
    List<String> modelProperties =  List.of("Testprop1", "Proptest2");
    Map<String, List<String>> expectedModels = new HashMap<>();
    expectedModels.put(modelName, modelProperties);
    when(collector.getModels()).thenReturn(expectedModels);

    MockHttpRequest request = MockHttpRequest.get("api/v2/mustache");
    MockHttpResponse response = new MockHttpResponse();
    dispatcher.invoke(request, response);

    assertThat(response.getStatus()).isEqualTo(200);

    Map<String, List<String>> responseBody = mapper.readValue(response.getOutput(), new TypeReference<>() {});
    assertThat(responseBody).hasSize(1);
    assertThat(responseBody.get(modelName)).containsExactlyInAnyOrderElementsOf(modelProperties);
  }
}
