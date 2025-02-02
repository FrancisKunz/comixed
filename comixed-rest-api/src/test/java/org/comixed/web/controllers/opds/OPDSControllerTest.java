/*
 * ComiXed - A digital comic book library management application.
 * Copyright (C) 2018, The ComiXed Project
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.package
 * org.comixed;
 */

package org.comixed.web.controllers.opds;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertNull;

import java.security.Principal;
import java.text.ParseException;
import java.util.ArrayList;
import java.util.List;

import org.comixed.model.user.ComiXedUser;
import org.comixed.model.library.Comic;
import org.comixed.repositories.ComiXedUserRepository;
import org.comixed.repositories.ComicRepository;
import org.comixed.web.opds.OPDSController;
import org.comixed.web.opds.OPDSFeed;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.MockitoJUnitRunner;
import org.springframework.boot.test.context.SpringBootTest;

@RunWith(MockitoJUnitRunner.class)
@SpringBootTest
public class OPDSControllerTest
{
    private static final String TEST_USER_EMAIL = "reader@local";
    private static final Long TEST_USER_ID = 1000L;

    @InjectMocks
    private OPDSController controller;

    @Mock
    private ComiXedUserRepository userRepository;

    @Mock
    private Principal principal;

    @Mock
    private ComiXedUser user;

    @Mock
    private ComicRepository comicRepository;

    private List<Comic> comicList = new ArrayList<>();

    @Test
    public void testGetNavigationFeed() throws ParseException
    {
        OPDSFeed result = controller.getNavigationFeed();

        assertNotNull(result);
    }

    @Test
    public void testGetAllComics() throws ParseException
    {
        Mockito.when(comicRepository.findAll()).thenReturn(comicList);

        OPDSFeed result = controller.getAllComics();

        assertNotNull(result);
        assertEquals(comicList, result.getEntries());

        Mockito.verify(comicRepository, Mockito.times(1)).findAll();
    }
}
