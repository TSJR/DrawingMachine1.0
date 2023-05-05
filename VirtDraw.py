import pygame
import time
import math

def update(pixel, path, screen):

    for i in range(pixel):
        col = path[i][2]
        if i % 100 == 0:
            pass#print("cur_color", col)
        screen.set_at((path[i][0], path[i][1]), (col, col, col))


def draw(path, size):
    screen = pygame.display.set_mode([size[1], size[0]])
    screen.fill((255, 255, 255))
    pixel_count = 0
    done = False
    while not done:
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                done = True

        screen.fill((255, 255, 255))
        update(pixel_count, path, screen)
        pygame.display.flip()
        time.sleep(0.0001)
        pixel_count += 10
        if pixel_count >= len(path):
            while True:
                pass
