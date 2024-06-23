import axios, { type AxiosRequestConfig, type AxiosInstance, type AxiosResponse } from 'axios'
import config from '../../appConfig'
import type { AtLeastOne } from '../../types/utility/AtLeastOne'

/**
 * Create an instance of Axios with the base URL and headers configured.
 *
 * @return {AxiosInstance} The Axios instance with the base URL and headers.
 */
const client = axios.create({
  baseURL: config.api.url,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Use this class to extend other services and add methods for each request
export default class BaseService {
  private readonly client: AxiosInstance

  constructor () {
    this.client = client
  }

  /**
   * Sends a GET request to the specified URL with optional configuration.
   *
   * @template T - The type of the response data.
   * @template D - The type of the data object.
   * @param {string} url - The URL to send the GET request to.
   * @param {AxiosRequestConfig<D>} config - (Optional) The configuration for the request.
   * @return {Promise<AxiosResponse<T, D>>} A Promise that resolves with the response data.
   */
  protected async get<T, D = T>(url: string, config?: AxiosRequestConfig<D>): Promise<AxiosResponse<T, D>> {
    return await this.client.get<T, AxiosResponse<T, D>, D>(url, config).catch(this.handleError<T, D>)
  }

  /**
   * Sends a POST request to the specified URL with optional data and configuration.
   *
   * @template T - The type of the response data.
   * @template D - The type of the data object.
   * @param {string} url - The URL to send the POST request to.
   * @param {D} [data] - Optional data to send with the POST request.
   * @param {AxiosRequestConfig<D>} [config] - Optional configuration for the POST request.
   * @return {Promise<AxiosResponse<T, D>>} A promise that resolves with the response from the POST request.
   */
  protected async post<T, D = T>(url: string, data?: D, config?: AxiosRequestConfig<D>): Promise<AxiosResponse<T, D>> {
    return await this.client.post<T, AxiosResponse<T, D>, D>(url, data, config).catch(this.handleError<T, D>)
  }

  /**
   * Sends a PUT request to the specified URL with optional data and configuration.
   *
   * @template T - The type of the response data.
   * @template D - The type of the data object.
   * @param {string} url - The URL to send the PUT request to.
   * @param {D} [data] - Optional data to send with the PUT request.
   * @param {AxiosRequestConfig<D>} [config] - Optional configuration for the PUT request.
   * @return {Promise<AxiosResponse<T, D>>} A promise that resolves with the response from the PUT request.
   */
  protected async put<T, D = T>(url: string, data?: D, config?: AxiosRequestConfig<D>): Promise<AxiosResponse<T, D>> {
    return await this.client.put<T, AxiosResponse<T, D>, D>(url, data, config).catch(this.handleError<T, D>)
  }

/**
 * Sends a DELETE request to the specified URL with optional configuration.
 *
 * @template T - The type of the response data.
 * @template D - The type of the data object.
 * @param {string} url - The URL to send the DELETE request to.
 * @param {AxiosRequestConfig<D>} [config] - Optional configuration for the DELETE request.
 * @return {Promise<AxiosResponse<T, D>>} A promise that resolves with the response from the DELETE request.
 */
  protected async delete<T, D = T>(url: string, config?: AxiosRequestConfig<D>): Promise<AxiosResponse<T, D>> {
    return await this.client.delete<T, AxiosResponse<T, D>, D>(url, config).catch(this.handleError<T, D>)
  }

  /**
   * Sends a PATCH request to the specified URL with optional data and configuration.
   * @template T - The type of the response data.
   * @template D - The type of the data object.
   * @template E - The type of the data object with at least one property from `D`.
   * @param {string} url - The URL to send the PATCH request to.
   * @param {E} [data] - Optional data to send with the PATCH request.
   * @param {AxiosRequestConfig<E>} [config] - Optional configuration for the PATCH request.
   * @return {Promise<AxiosResponse<T, E>>} A promise that resolves with the response from the PATCH request.
   */
  protected async patch<T, D = T, E = AtLeastOne<D>>(url: string, data?: E, config?: AxiosRequestConfig<E>): Promise<AxiosResponse<T, E>> {
    return await this.client.patch<T, AxiosResponse<T, E>, E>(url, data, config).catch(this.handleError<T, E>)
  }

  /**
   * Handles the error response from the Axios request and logs the response.
   *
   * @param {AxiosResponse<T, D>} response - The error response from the Axios request.
   * @return {Promise<AxiosResponse<T, D>>} A promise that rejects with the error response.
   */
  private async handleError<T, D = T> (response: AxiosResponse<T, D>): Promise<AxiosResponse<T, D>> {
    console.log(response)

    return await Promise.reject(response)
  }
}
