/*
 * ComiXed - A digital comic book library management application.
 * Copyright (C) 2017, The ComiXed Project
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

package org.comixed.controller.scraping;

import org.comixed.model.library.Comic;
import org.comixed.net.ComicScrapeRequest;
import org.comixed.service.library.ComicException;
import org.comixed.service.library.ComicService;
import org.comixed.web.WebRequestException;
import org.comixed.web.comicvine.*;
import org.comixed.web.model.ComicIssue;
import org.comixed.web.model.ComicVolume;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.MockitoJUnitRunner;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertSame;

@RunWith(MockitoJUnitRunner.class)
@SpringBootTest
public class ComicVineScraperControllerTest {
    private static final String TEST_API_KEY = "12345";
    private static final String TEST_SERIES_NAME = "Awesome Comic";
    private static final String TEST_VOLUME = "2018";
    private static final String TEST_ISSUE_NUMBER = "15";
    private static final long TEST_COMIC_ID = 213L;
    private static final String TEST_ISSUE_ID = "48132";
    private static final String TEST_VOLUME_ID = "23184";
    private static final String TEST_PUBLISHER_ID = "8213";
    private static final boolean TEST_SKIP_CACHE = true;

    @InjectMocks private ComicVineScraperController controller;
    @Mock private ComicVineQueryForVolumesAdaptor queryForVolumesAdaptor;
    @Mock private ComicVineQueryForIssueAdaptor queryForIssueAdaptor;
    @Mock private ComicVineQueryForIssueDetailsAdaptor queryForIssueDetailsAdaptor;
    @Mock private ComicVineQueryForVolumeDetailsAdaptor queryForVolumeDetailsAdaptor;
    @Mock private ComicVineQueryForPublisherDetailsAdaptor queryForPublisherDetailsAdaptor;
    @Mock private List<ComicVolume> comicVolumeList;
    @Mock private ComicIssue comicIssue;
    @Mock private ComicService comicService;
    @Mock private Comic comic;
    private ComicScrapeRequest comicScrapeRequest = new ComicScrapeRequest(TEST_COMIC_ID,
                                                                           TEST_API_KEY,
                                                                           TEST_ISSUE_ID,
                                                                           TEST_SKIP_CACHE);

    @Test(expected = ComicVineAdaptorException.class)
    public void testQueryForVolumesAdaptorRaisesException()
            throws
            WebRequestException,
            ComicVineAdaptorException {
        Mockito.when(queryForVolumesAdaptor.execute(Mockito.anyString(),
                                                    Mockito.anyString(),
                                                    Mockito.anyBoolean()))
               .thenThrow(new ComicVineAdaptorException("expected"));

        try {
            controller.queryForVolumes(TEST_API_KEY,
                                       TEST_SERIES_NAME,
                                       TEST_VOLUME,
                                       TEST_ISSUE_NUMBER,
                                       false);
        }
        finally {
            Mockito.verify(queryForVolumesAdaptor,
                           Mockito.times(1))
                   .execute(TEST_API_KEY,
                            TEST_SERIES_NAME,
                            false);
        }
    }

    @Test
    public void testQueryForVolumes()
            throws
            ComicVineAdaptorException,
            WebRequestException {
        Mockito.when(queryForVolumesAdaptor.execute(Mockito.anyString(),
                                                    Mockito.anyString(),
                                                    Mockito.anyBoolean()))
               .thenReturn(comicVolumeList);

        List<ComicVolume> result = controller.queryForVolumes(TEST_API_KEY,
                                                              TEST_SERIES_NAME,
                                                              TEST_VOLUME,
                                                              TEST_ISSUE_NUMBER,
                                                              false);

        assertSame(comicVolumeList,
                   result);

        Mockito.verify(queryForVolumesAdaptor,
                       Mockito.times(1))
               .execute(TEST_API_KEY,
                        TEST_SERIES_NAME,
                        false);
    }

    @Test
    public void testQueryForVolumesSkipCache()
            throws
            ComicVineAdaptorException,
            WebRequestException {
        Mockito.when(queryForVolumesAdaptor.execute(Mockito.anyString(),
                                                    Mockito.anyString(),
                                                    Mockito.anyBoolean()))
               .thenReturn(comicVolumeList);

        List<ComicVolume> result = controller.queryForVolumes(TEST_API_KEY,
                                                              TEST_SERIES_NAME,
                                                              TEST_VOLUME,
                                                              TEST_ISSUE_NUMBER,
                                                              true);

        assertSame(comicVolumeList,
                   result);

        Mockito.verify(queryForVolumesAdaptor,
                       Mockito.times(1))
               .execute(TEST_API_KEY,
                        TEST_SERIES_NAME,
                        true);
    }

    @Test(expected = ComicVineAdaptorException.class)
    public void testQueryForIssueAdaptorRaisesException()
            throws
            ComicVineAdaptorException {
        Mockito.when(queryForIssueAdaptor.execute(Mockito.anyString(),
                                                  Mockito.anyString(),
                                                  Mockito.anyString()))
               .thenThrow(new ComicVineAdaptorException("expected"));

        try {
            controller.queryForIssue(TEST_API_KEY,
                                     TEST_VOLUME,
                                     TEST_ISSUE_NUMBER);
        }
        finally {
            Mockito.verify(queryForIssueAdaptor,
                           Mockito.times(1))
                   .execute(TEST_API_KEY,
                            TEST_VOLUME,
                            TEST_ISSUE_NUMBER);
        }
    }

    @Test
    public void testQueryForIssue()
            throws
            ComicVineAdaptorException {
        Mockito.when(queryForIssueAdaptor.execute(Mockito.anyString(),
                                                  Mockito.anyString(),
                                                  Mockito.anyString()))
               .thenReturn(comicIssue);

        ComicIssue result = controller.queryForIssue(TEST_API_KEY,
                                                     TEST_VOLUME,
                                                     TEST_ISSUE_NUMBER);

        assertNotNull(result);
        assertSame(comicIssue,
                   result);

        Mockito.verify(queryForIssueAdaptor,
                       Mockito.times(1))
               .execute(TEST_API_KEY,
                        TEST_VOLUME,
                        TEST_ISSUE_NUMBER);
    }

    @Test(expected = ComicException.class)
    public void testScrapeAndSaveComicDetailsNoSuchComic()
            throws
            ComicVineAdaptorException,
            ComicException {
        Mockito.when(comicService.getComic(Mockito.anyLong()))
               .thenThrow(ComicException.class);

        controller.scrapeAndSaveComicDetails(comicScrapeRequest);

        Mockito.verify(comicService,
                       Mockito.times(1))
               .getComic(TEST_COMIC_ID);
    }

    @Test(expected = ComicVineAdaptorException.class)
    public void testScrapeAndSaveComicIssueDetailsAdaptorRaisesException()
            throws
            ComicVineAdaptorException,
            ComicException {
        Mockito.when(comicService.getComic(Mockito.anyLong()))
               .thenReturn(comic);
        Mockito.doThrow(new ComicVineAdaptorException("expected"))
               .when(queryForIssueDetailsAdaptor)
               .execute(Mockito.anyString(),
                        Mockito.anyLong(),
                        Mockito.anyString(),
                        Mockito.any(Comic.class),
                        Mockito.anyBoolean());

        try {
            controller.scrapeAndSaveComicDetails(comicScrapeRequest);
        }
        finally {
            Mockito.verify(comicService,
                           Mockito.times(1))
                   .getComic(TEST_COMIC_ID);
            Mockito.verify(queryForIssueDetailsAdaptor,
                           Mockito.times(1))
                   .execute(TEST_API_KEY,
                            TEST_COMIC_ID,
                            TEST_ISSUE_ID,
                            comic,
                            TEST_SKIP_CACHE);
        }
    }

    @Test(expected = ComicVineAdaptorException.class)
    public void testScrapeAndSaveComicVolumeDetailsAdaptorRaisesException()
            throws
            ComicVineAdaptorException,
            ComicException {
        Mockito.when(comicService.getComic(Mockito.anyLong()))
               .thenReturn(comic);
        Mockito.when(queryForIssueDetailsAdaptor.execute(Mockito.anyString(),
                                                         Mockito.anyLong(),
                                                         Mockito.anyString(),
                                                         Mockito.any(Comic.class),
                                                         Mockito.anyBoolean()))
               .thenReturn(TEST_VOLUME_ID);
        Mockito.doThrow(new ComicVineAdaptorException("expected"))
               .when(queryForVolumeDetailsAdaptor)
               .execute(Mockito.anyString(),
                        Mockito.anyString(),
                        Mockito.any(Comic.class),
                        Mockito.anyBoolean());

        try {
            controller.scrapeAndSaveComicDetails(comicScrapeRequest);
        }
        finally {
            Mockito.verify(comicService,
                           Mockito.times(1))
                   .getComic(TEST_COMIC_ID);
            Mockito.verify(queryForIssueDetailsAdaptor,
                           Mockito.times(1))
                   .execute(TEST_API_KEY,
                            TEST_COMIC_ID,
                            TEST_ISSUE_ID,
                            comic,
                            TEST_SKIP_CACHE);
            Mockito.verify(queryForVolumeDetailsAdaptor,
                           Mockito.times(1))
                   .execute(TEST_API_KEY,
                            TEST_VOLUME_ID,
                            comic,
                            TEST_SKIP_CACHE);
        }
    }

    @Test(expected = ComicVineAdaptorException.class)
    public void testScrapeAndSaveComicPublisherDetailsAdaptorRaisesException()
            throws
            ComicVineAdaptorException,
            ComicException {
        Mockito.when(comicService.getComic(Mockito.anyLong()))
               .thenReturn(comic);
        Mockito.when(queryForIssueDetailsAdaptor.execute(Mockito.anyString(),
                                                         Mockito.anyLong(),
                                                         Mockito.anyString(),
                                                         Mockito.any(Comic.class),
                                                         Mockito.anyBoolean()))
               .thenReturn(TEST_VOLUME_ID);
        Mockito.when(queryForVolumeDetailsAdaptor.execute(Mockito.anyString(),
                                                          Mockito.anyString(),
                                                          Mockito.any(Comic.class),
                                                          Mockito.anyBoolean()))
               .thenReturn(TEST_PUBLISHER_ID);
        Mockito.doThrow(new ComicVineAdaptorException("expected"))
               .when(queryForPublisherDetailsAdaptor)
               .execute(Mockito.anyString(),
                        Mockito.anyString(),
                        Mockito.any(Comic.class),
                        Mockito.anyBoolean());

        try {
            controller.scrapeAndSaveComicDetails(comicScrapeRequest);
        }
        finally {
            Mockito.verify(comicService,
                           Mockito.times(1))
                   .getComic(TEST_COMIC_ID);
            Mockito.verify(queryForIssueDetailsAdaptor,
                           Mockito.times(1))
                   .execute(TEST_API_KEY,
                            TEST_COMIC_ID,
                            TEST_ISSUE_ID,
                            comic,
                            TEST_SKIP_CACHE);
            Mockito.verify(queryForVolumeDetailsAdaptor,
                           Mockito.times(1))
                   .execute(TEST_API_KEY,
                            TEST_VOLUME_ID,
                            comic,
                            TEST_SKIP_CACHE);
            Mockito.verify(queryForPublisherDetailsAdaptor,
                           Mockito.times(1))
                   .execute(TEST_API_KEY,
                            TEST_PUBLISHER_ID,
                            comic,
                            TEST_SKIP_CACHE);
        }
    }

    @Test
    public void testScrapeAndSaveComicDetails()
            throws
            ComicVineAdaptorException,
            ComicException {
        Mockito.when(comicService.getComic(Mockito.anyLong()))
               .thenReturn(comic);
        Mockito.when(queryForIssueDetailsAdaptor.execute(Mockito.anyString(),
                                                         Mockito.anyLong(),
                                                         Mockito.anyString(),
                                                         Mockito.any(Comic.class),
                                                         Mockito.anyBoolean()))
               .thenReturn(TEST_VOLUME_ID);
        Mockito.when(queryForVolumeDetailsAdaptor.execute(Mockito.anyString(),
                                                          Mockito.anyString(),
                                                          Mockito.any(Comic.class),
                                                          Mockito.anyBoolean()))
               .thenReturn(TEST_PUBLISHER_ID);
        Mockito.when(comicService.save(Mockito.any(Comic.class)))
               .thenReturn(comic);

        Comic result = controller.scrapeAndSaveComicDetails(comicScrapeRequest);

        assertNotNull(result);
        assertSame(comic,
                   result);

        Mockito.verify(comicService,
                       Mockito.times(1))
               .getComic(TEST_COMIC_ID);
        Mockito.verify(queryForIssueDetailsAdaptor,
                       Mockito.times(1))
               .execute(TEST_API_KEY,
                        TEST_COMIC_ID,
                        TEST_ISSUE_ID,
                        comic,
                        TEST_SKIP_CACHE);
        Mockito.verify(queryForVolumeDetailsAdaptor,
                       Mockito.times(1))
               .execute(TEST_API_KEY,
                        TEST_VOLUME_ID,
                        comic,
                        TEST_SKIP_CACHE);
        Mockito.verify(queryForPublisherDetailsAdaptor,
                       Mockito.times(1))
               .execute(TEST_API_KEY,
                        TEST_PUBLISHER_ID,
                        comic,
                        TEST_SKIP_CACHE);
        Mockito.verify(comicService,
                       Mockito.times(1))
               .save(comic);
    }

    @Test
    public void testScrapeAndSaveComicDetailsSkipCache()
            throws
            ComicVineAdaptorException,
            ComicException {
        Mockito.when(comicService.getComic(Mockito.anyLong()))
               .thenReturn(comic);
        Mockito.when(queryForIssueDetailsAdaptor.execute(Mockito.anyString(),
                                                         Mockito.anyLong(),
                                                         Mockito.anyString(),
                                                         Mockito.any(Comic.class),
                                                         Mockito.anyBoolean()))
               .thenReturn(TEST_VOLUME_ID);
        Mockito.when(queryForVolumeDetailsAdaptor.execute(Mockito.anyString(),
                                                          Mockito.anyString(),
                                                          Mockito.any(Comic.class),
                                                          Mockito.anyBoolean()))
               .thenReturn(TEST_PUBLISHER_ID);
        Mockito.when(comicService.save(Mockito.any(Comic.class)))
               .thenReturn(comic);

        Comic result = controller.scrapeAndSaveComicDetails(comicScrapeRequest);

        assertNotNull(result);
        assertSame(comic,
                   result);

        Mockito.verify(comicService,
                       Mockito.times(1))
               .getComic(TEST_COMIC_ID);
        Mockito.verify(queryForIssueDetailsAdaptor,
                       Mockito.times(1))
               .execute(TEST_API_KEY,
                        TEST_COMIC_ID,
                        TEST_ISSUE_ID,
                        comic,
                        true);
        Mockito.verify(queryForVolumeDetailsAdaptor,
                       Mockito.times(1))
               .execute(TEST_API_KEY,
                        TEST_VOLUME_ID,
                        comic,
                        true);
        Mockito.verify(queryForPublisherDetailsAdaptor,
                       Mockito.times(1))
               .execute(TEST_API_KEY,
                        TEST_PUBLISHER_ID,
                        comic,
                        true);
        Mockito.verify(comicService,
                       Mockito.times(1))
               .save(comic);
    }
}
